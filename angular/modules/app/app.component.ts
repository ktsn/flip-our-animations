import { Component } from '@angular/core'

const { range, add, remove, sort, shuffle, randomInt, genId } = require('../../../shared')

@Component({
  selector: 'app',
  templateUrl: './app.html'
})
export class AppComponent {
  list: number[] = range(100).map(genId)

  add (): void {
    this.list = range(10).reduce((next: number[]) => {
      return add(next, randomInt(next.length), genId())
    }, this.list)
  }

  remove (): void {
    this.list = range(10).reduce((next: number[]) => {
      return remove(next, randomInt(next.length))
    }, this.list)
  }

  asc (): void {
    this.list = sort(this.list, (a: number, b: number) => a - b)
  }

  desc (): void {
    this.list = sort(this.list, (a: number, b: number) => b - a)
  }

  shuffle (): void {
    this.list = shuffle(this.list)
  }
}
