<flip>
  <yield />

  <script>
  const moveClass = opts['move-class'] || 'moving'
  const map = {}

  this.on('update', () => {
    Array.from(this.root.children).forEach(c => {
      map[c.getAttribute('key')] = {
        pos: c.getBoundingClientRect(),
        moved: false,
        moveCb: null
      }
    })
  })

  this.on('updated', () => {
    const children = Array.from(this.root.children)

    children.forEach(c => {
      const key = c.getAttribute('key')
      const data = map[key]

      if (!data) return

      if (data.moveCb) {
        data.moveCb()
      }

      const prev = data.pos
      const next = c.getBoundingClientRect()

      const dx = prev.left - next.left
      const dy = prev.top - next.top

      if (!dx && !dy) return
      data.moved = true

      const s = c.style
      s.transitionDuration = '0s'
      s.transform = `translate(${dx}px, ${dy}px)`
    })

    const f = document.body.clientHeight // force reflow

    children.forEach(c => {
      const key = c.getAttribute('key')
      const data = map[key]

      if (!data || !data.moved) return
      data.moved = false

      c.classList.add(moveClass)
      c.style.transitionDuration = c.style.transform = ''
      c.addEventListener('transitionend', data.moveCb = function cb(event) {
        if (!event || /transform$/i.test(event.propertyName)) {
          c.removeEventListener('transitionend', cb)
          c.classList.remove(moveClass)
          data.moveCb = null
        }
      })
    })
  })
  </script>
</flip>
