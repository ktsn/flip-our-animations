import React from 'react'
import Header from './components/Header'
import TodoItem from './components/TodoItem'
import Flip from './Flip'

export default class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      todoTitle: '',
      todos: [],
      filter: 'all'
    }
  }

  componentWillMount () {
    window.fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => this.setState({ todos: data }))
  }

  filterTodos (filter) {
    switch (filter) {
      case 'active':
        return this.state.todos.filter(t => !t.completed)
      case 'completed':
        return this.state.todos.filter(t => t.completed)
      case 'all':
      default:
        return this.state.todos
    }
  }

  addTodo (title) {
    this.setState({
      todoTitle: '',
      todos: [
        {
          id: createId(),
          title,
          editing: false,
          completed: false
        },
        ...this.state.todos
      ]
    })
  }

  updateTodo (todo, updater) {
    this.setState({
      todos: this.state.todos.map(t => {
        return t.id !== todo.id ? t : {
          ...t,
          ...updater
        }
      })
    })
  }

  removeTodo (todo) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== todo.id)
    })
  }

  clearCompleted () {
    this.setState({
      todos: this.state.todos.filter(t => !t.completed)
    })
  }

  render () {
    const { todoTitle, filter } = this.state

    const items = this.filterTodos(filter).map(t => (
      <TodoItem
        key={t.id}
        todo={t}
        onRemove={() => this.removeTodo(t)}
        onChangeTitle={title => this.updateTodo(t, { title })}
        onChangeEditing={editing => this.updateTodo(t, { editing })}
        onChangeCompleted={completed => this.updateTodo(t, { completed })} />
    ))

    return (
      <section className="todoapp">
        <Header
          text={todoTitle}
          onChange={text => this.setState({ todoTitle: text })}
          onSubmit={text => this.addTodo(text)}/>
        <div className="footer">
          <span className="todo-count">
            <strong>{this.filterTodos('active').length}</strong> item left
          </span>
          <ul className="filters">
            <li>
              <a className={this.state.filter === 'all' ? 'selected' : ''}
                href="#/"
                onClick={() => this.setState({ filter: 'all' })}>All</a>
            </li>
            <li>
              <a className={this.state.filter === 'active' ? 'selected' : ''}
                href="#/active"
                onClick={() => this.setState({ filter: 'active' })}>Active</a>
            </li>
            <li>
              <a className={this.state.filter === 'completed' ? 'selected' : ''}
                href="#/completed"
                onClick={() => this.setState({ filter: 'completed' })}>Completed</a>
            </li>
          </ul>
          <button className="clear-completed" onClick={() => this.clearCompleted()}>Clear completed</button>
        </div>
        <section className="main">
          <label htmlFor="toggle-all">Mark all as complete</label>
          <Flip className="todo-list" tag="ul">
            {items}
          </Flip>
        </section>
      </section>
    )
  }
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
