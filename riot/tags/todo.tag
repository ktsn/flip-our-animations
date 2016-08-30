<todo class={ completed: todo.completed, editing: todo.editing }>
  <div class="view">
    <input class="toggle" type="checkbox" checked={ todo.completed } onchange={ onChangeCompleted }>
    <label ondblclick={ onStartEditing }>{ todo.title }</label>
    <button class="destroy" onclick={ onRemoveTodo }></button>
  </div>
  <input class="edit" value={ todo.title } oninput={ onInputTodo } onblur={ onFinishEditing }>

  <script>
  this.todo = opts.todo

  onChangeCompleted (event) {
    this.todo.completed = event.target.checked
    this.parent.parent.trigger('update-todo', this.todo)
  }

  onStartEditing () {
    this.todo.editing = true
    this.parent.parent.trigger('update-todo', this.todo)
  }

  onFinishEditing () {
    this.todo.editing = false
    this.parent.parent.trigger('update-todo', this.todo)
  }

  onInputTodo (event) {
    this.todo.title = event.target.value
    this.parent.parent.trigger('update-todo', this.todo)
  }

  onRemoveTodo () {
    this.parent.parent.trigger('remove-todo', this.todo)
  }
  </script>
</todo>
