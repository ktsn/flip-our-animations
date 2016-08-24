import React from 'react'
import ReactDOM from 'react-dom'

export default class FlipChild extends React.PureComponent {
  componentDidMount () {
    this._prev = ReactDOM.findDOMNode(this.el).getBoundingClientRect()
  }

  componentDidUpdate () {
    if (this._moveCb) {
      this._moveCb()
    }

    const el = ReactDOM.findDOMNode(this.el)

    const prev = this._prev
    const next = this._prev = el.getBoundingClientRect()

    const dx = prev.left - next.left
    const dy = prev.top - next.top

    if (!dx && !dy) return

    const s = el.style
    s.transitionDuration = '0s'
    s.transform = `translate(${dx}px, ${dy}px)`

    window.requestAnimationFrame(() => {
      el.classList.add(this.props.moveClass)
      s.transitionDuration = s.transform = ''

      el.addEventListener('transitionend', this._moveCb = (event) => {
        if (!event || /transform$/.test(event.propertyName)) {
          el.removeEventListener('transitionend', this._moveCb)
          el.classList.remove(this.props.moveClass)
          this._moveCb = null
        }
      })
    })
  }

  render () {
    const child = React.Children.only(this.props.children)
    return (
      React.cloneElement(child, {
        ref: c => { this.el = c }
      })
    )
  }
}
