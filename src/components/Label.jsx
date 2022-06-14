import React, { Component } from 'react'

export class Label extends Component {
  render() {
    return (
      <div className='flex my-2'>
            <span className='border-l-8 font-bold border-red-900 bg-white px-3 py-1 flex items-center gap-1'> {this.props.children} </span>
        </div>
    )
  }
}

export default Label