import $ from 'jquery'
import './flip'

$(() => {
  const $list = $('#js-todo-list')
    .on('dblclick', '.js-title', event => {
      $(event.currentTarget)
        .closest('li').addClass('editing')
        .find('.js-edit').focus()
    })
    .on('blur', '.js-edit', event => {
      $(event.currentTarget)
        .closest('li').removeClass('editing')
        .find('.js-title')
        .text(event.currentTarget.value)
        .focus()
    })
    .on('click', '.js-toggle', event => {
      $(event.currentTarget)
        .closest('li').toggleClass('completed')
    })
    .on('click', '.js-remove', event => {
      $(event.currentTarget)
        .closest('li').remove()
    })

  $('#js-new-todo').on('keypress', event => {
    if (event.key === 'Enter') {
      const $input = $(event.currentTarget)
      const value = $input.val()
      $input.val('')

      const $item = $itemTemplate.clone()
      $item.find('.js-title').text(value)
      $item.prependTo($list)
    }
  })

  $('#js-all').on('click', event => {
    event.preventDefault()
    $list.children().show()
  })

  $('#js-active').on('click', event => {
    event.preventDefault()
    $list.children()
      .show()
      .filter((i, el) => $(el).hasClass('completed'))
      .hide()
  })

  $('#js-completed').on('click', event => {
    event.preventDefault()
    $list.children()
      .show()
      .filter((i, el) => !$(el).hasClass('completed'))
      .hide()
  })

  $('#js-clear-completed').on('click', event => {
    event.preventDefault()
    $list.children()
      .filter((i, el) => $(el).hasClass('completed'))
      .remove()
  })

  const $itemTemplate = $(`
  <li>
    <div class="view">
      <input class="js-toggle toggle" type="checkbox">
      <label class="js-title"></label>
      <button class="js-remove destroy"></button>
    </div>
    <input class="js-edit js-title edit" value="">
  </li>
  `)

  window.fetch('https://jsonplaceholder.typicode.com/todos')
    .then(res => res.json())
    .then(posts => {
      const $items = posts.map(p => {
        const $item = $itemTemplate.clone()
        $item.find('.js-title').text(p.title)
        if (p.completed) {
          $item.addClass('completed')
            .find('.js-toggle').prop('checked', true)
        }
        return $item
      })
      $list.append($items)
        .flip()
    })
})
