import React, { Component } from 'react'

export class Container extends Component {
  render() {
    return (
      <div className='pt-2 pb-10 px-2 xl:px-9 min-h-screen'>{this.props.children}</div>
    )
  }
}

export default Container