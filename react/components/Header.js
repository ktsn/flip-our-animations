import React from 'react'

export default function Header ({ text, onChange, onSubmit }) {
  function onKeyPress (event) {
    if (event.key === 'Enter') {
      onSubmit(text)
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={text}
        onChange={event => onChange(event.target.value)}
        onKeyPress={onKeyPress} />
    </header>
  )
}
