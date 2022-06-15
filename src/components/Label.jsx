import React, { Component } from 'react'

export default class Label extends Component {
  render() {
    return (
      <div className='flex my-2'>
            <span className='border-l-8 font-bold border-red-900 bg-white dark:bg-slate-800 dark:text-white px-3 py-1 flex items-center gap-1'> {this.props.children} </span>
      </div>
    )
  }
}
