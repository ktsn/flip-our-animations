import React from 'react'
import Flip from './Flip'

import { range, add, remove, sort, shuffle, randomInt, genId } from '../shared'

export default class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      list: range(100).map(() => genId())
    }
  }

  add () {
    this.setState({
      list: range(10).reduce(next => {
        return add(next, randomInt(next.length), genId())
      }, this.state.list)
    })
  }

  remove () {
    this.setState({
      list: range(10).reduce(next => {
        return remove(next, randomInt(next.length))
      }, this.state.list)
    })
  }

  asc () {
    this.sort((a, b) => a - b)
  }

  desc () {
    this.sort((a, b) => b - a)
  }

  sort (fn) {
    this.setState({
      list: sort(this.state.list, fn)
    })
  }

  shuffle () {
    this.setState({
      list: shuffle(this.state.list)
    })
  }

  render () {
    return (
      <article className="main">
        <h1 className="title">FLIP Animation</h1>

        <div className="controls">
          <button type="button" onClick={() => this.add()}>Add</button>
          <button type="button" onClick={() => this.remove()}>Remove</button>
          <button type="button" onClick={() => this.asc()}>ASC</button>
          <button type="button" onClick={() => this.desc()}>DESC</button>
          <button type="button" onClick={() => this.shuffle()}>Shuffle</button>
        </div>

        <Flip tag="ul" className="list">
          {this.state.list.map(item => <li key={item} className="item">{item}</li>)}
        </Flip>
      </article>
    )
  }
}
