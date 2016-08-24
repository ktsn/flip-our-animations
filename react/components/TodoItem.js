import React from 'react'

export default class TodoItem extends React.PureComponent {
  componentDidUpdate () {
    if (this.props.todo.editing) {
      this.input.focus()
    }
  }

  onDoubleClickItem () {
    this.props.onChangeEditing(true)
  }

  onKeyPressInput (event) {
    if (event.key === 'Enter') {
      this.props.onChangeEditing(false)
    }
  }

  getClassName (completed, editing) {
    let className = []
    if (completed) {
      className.push('completed')
    }
    if (editing) {
      className.push('editing')
    }
    return className.join(' ')
  }

  render () {
    const {
      todo: {
        title,
        completed,
        editing
      },
      onRemove,
      onChangeTitle,
      onChangeEditing,
      onChangeCompleted
    } = this.props

    return (
      <li className={this.getClassName(completed, editing)}
        onDoubleClick={() => this.onDoubleClickItem()}>
        <div className="view">
          <input className="toggle" type="checkbox"
            checked={completed}
            onChange={event => onChangeCompleted(event.target.checked)} />
          <label>{title}</label>
          <button className="destroy" onClick={onRemove} />
        </div>
        <input className="edit"
          value={title}
          ref={c => { this.input = c }}
          onBlur={() => onChangeEditing(false)}
          onKeyPress={event => this.onKeyPressInput(event)}
          onChange={event => onChangeTitle(event.target.value)} />
      </li>
    )
  }
}
