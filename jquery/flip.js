import $ from 'jquery'

$.fn.flip = function (options = {}) {
  const {
    moveClass = 'moving'
  } = options

  this.each((i, el) => {
    $(el).children().each((i, el) => {
      const $el = $(el)
      $el.data('offset', $el.offset())
      observeUpdate(el, mutations => {
        if ($el.hasClass(moveClass)) return
        enqueue(onUpdate)
      })
    })

    observeChildren(el, mutations => enqueue(onUpdate))

    function onUpdate () {
      const $children = $(el).children()

      $children.each((i, el) => {
        const $el = $(el)
        const moveCb = $el.data('move-cb')
        if (moveCb) {
          moveCb()
        }

        if ($el.css('display') === 'none') {
          $el.data('offset', false)
          return
        }

        const prev = $el.data('offset')
        const next = $el.offset()
        $el.data('offset', next)

        if (!prev) return

        const dx = prev.left - next.left
        const dy = prev.top - next.top

        if (!dx && !dy) return

        $el.data('moved', true)
          .css('transition-duration', '0s')
          .css('transform', `translate(${dx}px, ${dy}px)`)
      })

      const f = document.body.clientHeight // eslint-disable-line

      $children.each((i, el) => {
        const $el = $(el)

        if (!$el.data('moved')) return

        const cb = event => {
          if (!event || /transform$/.test(event.originalEvent.propertyName)) {
            $el.off('transitionend', cb)
              .data('move-cb', null)
              .removeClass(moveClass)
          }
        }

        $el.data('moved', false)
          .addClass(moveClass)
          .data('move-cb', cb)
          .css('transition-duration', '')
          .css('transform', '')
          .on('transitionend', cb)
      })
    }
  })
}

function observeChildren (el, fn) {
  const observer = new window.MutationObserver(mutations => {
    mutations.forEach(record => {
      record.addedNodes.forEach(node => observeUpdate(el, fn))
    })
    fn(mutations)
  })

  observer.observe(el, {
    childList: true
  })

  return () => observer.disconnect()
}

function observeUpdate (el, fn) {
  const observer = new window.MutationObserver(fn)

  observer.observe(el, {
    attributes: true,
    attributeFilter: ['style']
  })

  return () => observer.disconnect()
}

let queue = []
function enqueue (fn) {
  if (queue.length === 0) {
    window.requestAnimationFrame(() => {
      queue.forEach(f => f())
      queue = []
    })
  }

  if (queue.indexOf(fn) < 0) {
    queue.push(fn)
  }
}
