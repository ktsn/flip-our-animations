<app>
  <article class="main">
    <h1 class="title">FLIP Animation</h1>

    <div class="controls">
      <button type="button" onclick={ add }>Add</button>
      <button type="button" onclick={ remove }>Remove</button>
      <button type="button" onclick={ asc }>ASC</button>
      <button type="button" onclick={ desc }>DESC</button>
      <button type="button" onclick={ shuffle }>Shuffle</button>
    </div>

    <ul riot-tag="flip" class="list">
      <li class="item" each={ item in parent.list } key={ item }>{ item }</li>
    </ul>
  </article>

  <script>
  import './flip'

  import { range, add, remove, sort, shuffle, randomInt, genId } from '../shared'

  this.list = range(100).map(genId)

  add () {
    this.list = range(10).reduce(next => {
      return add(next, randomInt(next.length), genId())
    }, this.list)
  }

  remove () {
    this.list = range(10).reduce(next => {
      return remove(next, randomInt(next.length))
    }, this.list)
  }

  asc () {
    this.list = sort(this.list, (a, b) => a - b)
  }

  desc () {
    this.list = sort(this.list, (a, b) => b - a)
  }

  shuffle () {
    this.list = shuffle(this.list)
  }

  </script>
</app>
