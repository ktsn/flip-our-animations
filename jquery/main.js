import $ from 'jquery'
import './flip'

import { range, genId, randomInt } from '../shared'

$(() => {
  const $list = $('#js-list')

  $('#js-add-btn').on('click', add)
  $('#js-remove-btn').on('click', remove)
  $('#js-asc-btn').on('click', asc)
  $('#js-desc-btn').on('click', desc)
  $('#js-shuffle-btn').on('click', shuffle)

  const $itemTemplate = $('<li class="js-item item"></li>')

  range(10).forEach(add)
  $list.flip()

  function add () {
    range(10).forEach(() => {
      const $item = $itemTemplate.clone()
      const id = genId()

      $item
        .data('id', id)
        .text(id)
      insert($item, $list, randomInt($list.children().length))
    })
  }

  function remove () {
    range(10).forEach(() => {
      const $children = $list.children()
      $children.eq(randomInt($children.length)).remove()
    })
  }

  function insert ($el, $parent, index) {
    const $children = $parent.children()
    if ($children.length === index) {
      $parent.append($el)
    } else {
      $children.eq(index).before($el)
    }
  }

  function asc () {
    sort($list, (a, b) => {
      return $(a).data('id') - $(b).data('id')
    })
  }

  function desc () {
    sort($list, (a, b) => {
      return $(b).data('id') - $(a).data('id')
    })
  }

  function sort ($list, fn) {
    $list.children()
      .sort(fn)
      .each((i, el) => {
        $(el).appendTo($list)
      })
  }

  function shuffle () {
    let $children = $list.children()
    let $shuffled = $()
    for (let i = $children.length; i > 0; --i) {
      $shuffled = $shuffled.add($children.eq(randomInt(i)))
      $children = $children.filter(index => i !== index)
    }
    $list.append($shuffled)
  }
})
