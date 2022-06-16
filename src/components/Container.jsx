import React, { Component } from 'react'

export default class Container extends Component {
  render() {
    return (
      <div className='pt-2 pb-10 px-4 xl:px-9 min-h-screen'>{this.props.children}</div>
    )
  }
}

