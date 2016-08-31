import $ from 'jquery'
import './flip'

$(() => {
  let uid = 0

  const $list = $('#js-list')
    .on('click', '.js-remove-btn', event => {
      $(event.currentTarget).closest('.js-item').remove()
    })

  $('#js-add-btn').on('click', add)
  $('#js-asc-btn').on('click', asc)
  $('#js-desc-btn').on('click', desc)
  $('#js-shuffle-btn').on('click', shuffle)

  const $itemTemplate = $(`
  <li class="js-item item">
    <span class="js-text"></span>
    <button class="js-remove-btn remove-btn">&times;</button>
  </li>
  `)

  for (let i = 0; i < 100; ++i) {
    add()
  }
  $list.flip()

  function add () {
    const $item = $itemTemplate.clone()
    const id = ++uid

    $item
      .data('id', id)
      .find('.js-text').text(id)

    insert($item, $list, randomInt($list.children().length))
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

  function randomInt (length) {
    return Math.floor(Math.random() * length)
  }
})
