import { Component, OnInit } from '@angular/core'
import { Todo } from '../../models/todo'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app',
  templateUrl: './app.html'
})
export class AppComponent implements OnInit {
  todoTitle = ''
  filter = 'all'

  constructor(private todoService: TodoService) {}

  ngOnInit () {
    this.todoService.fetchTodos()
  }

  filteredTodos (filter: 'all' | 'active' | 'completed'): Todo[] {
    switch (filter) {
      case 'all':
        return this.todoService.todos
      case 'active':
        return this.todoService.activeTodos
      case 'completed':
        return this.todoService.completedTodos
      default:
        return []
    }
  }

  removeTodo (todo: Todo): void {
    this.todoService.removeTodo(todo)
  }

  clearCompleted (): void {
    this.todoService.clearCompleted()
  }

  onKeyPressHeader (event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.todoService.addTodo(this.todoTitle)
      this.todoTitle = ''
    }
  }
}
