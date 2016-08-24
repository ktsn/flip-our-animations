import React from 'react'
import FlipChild from './FlipChild'

export default class Flip extends React.PureComponent {
  static defaultProps = {
    moveClass: 'moving',
    tag: 'span'
  }

  render () {
    const { moveClass, tag, children, ...props } = this.props

    const wrappedChildren = React.Children.map(children, c => (
      <FlipChild moveClass={moveClass}>
        {c}
      </FlipChild>
    ))

    return React.createElement(tag, props, wrappedChildren)
  }
}
