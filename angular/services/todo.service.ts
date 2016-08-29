import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { Todo } from '../models/todo'

@Injectable()
export class TodoService {
  todos: Todo[] = []

  constructor (private http: Http) {}

  get activeTodos (): Todo[] {
    return this.todos.filter(t => !t.completed)
  }

  get completedTodos (): Todo[] {
    return this.todos.filter(t => t.completed)
  }

  addTodo (title: string): void {
    const newTodo = new Todo(
      createId(),
      title,
      false,
      false
    )
  
    this.todos.unshift(newTodo)
  }

  removeTodo (todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id)
  }

  fetchTodos (): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .map(res => res.json())
      .map((data: any[]) => {
        return data.map(d => new Todo(String(d.id), d.title, d.completed, d.editing))
      })
      .forEach(todos => {
        this.todos = todos
      })
  }

  clearCompleted (): void {
    this.todos = this.activeTodos
  }
}

function createId (): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const length = chars.length
  return createArray(16).map(() => chars[randomInt(length)]).join('')
}

function createArray <T>(length: number): T[] {
  return Array.apply(null, Array(16))
}

function randomInt (max: number): number {
  return Math.floor(Math.random() * max)
}
