<app>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus value={ todoTitle } oninput={ onInputTitle } onkeypress={ onKeyPressTitle }>
    </header>
    <footer class="footer">
      <span class="todo-count"><strong>{ filteredTodos('active').length }</strong> item left</span>
      <ul class="filters">
        <li>
          <a class={ selected: filter === 'all' } onclick={ onChangeFilter } data-filter="all" href="#/">All</a>
        </li>
        <li>
          <a class={ selected: filter === 'active' } onclick={ onChangeFilter } data-filter="active" href="#/active">Active</a>
        </li>
        <li>
          <a class={ selected: filter === 'completed' } onclick={ onChangeFilter } data-filter="completed" href="#/completed">Completed</a>
        </li>
      </ul>
      <button onclick={ onClearCompleted } class="clear-completed">Clear completed</button>
    </footer>
    <section class="main">
      <ul class="todo-list">
        <todo each={ filteredTodos(filter) } todo={ this }></todo>
      </ul>
    </section>
  </section>

  <script>
  import './tags/todo'

  this.todoTitle = ''
  this.todos = []
  this.filter = 'all'

  this.on('before-mount', () => {
    window.fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => this.update({ todos: data }))
  })

  this.on('update-todo', todo => {
    this.todos = this.todos.map(t => {
      if (t.id !== todo.id) return t
      return todo
    })
  })

  this.on('remove-todo', todo => {
    this.todos = this.todos.filter(t => t.id !== todo.id)
  })

  filteredTodos (filter) {
    switch (filter) {
      case 'all':
        return this.todos
      case 'active':
        return this.todos.filter(t => !t.completed)
      case 'completed':
        return this.todos.filter(t => t.completed)
      default:
        return []
    }
  }

  onClearCompleted () {
    this.todos = this.todos.filter(t => !t.completed)
  }

  onInputTitle (event) {
    this.todoTitle = event.target.value
    return true
  }

  onKeyPressTitle (event) {
    if (event.key === 'Enter') {
      this.todos.unshift({
        id: createId(),
        title: event.target.value,
        completed: false,
        editing: false
      })
      this.todoTitle = ''
    }
    return true
  }

  onChangeFilter (event) {
    this.filter = event.target.dataset.filter
  }

  function createId () {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const length = chars.length
    return createArray(16).map(() => chars[randomInt(length)]).join('')
  }

  function createArray (length) {
    return Array.apply(null, Array(16))
  }

  function randomInt (length) {
    return Math.floor(Math.random() * length)
  }
  </script>
</app>
