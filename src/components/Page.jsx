import React, { Component } from 'react'

export default class Page extends Component {
  render() {
    return (
        <div className='bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-white'>
            {this.props.children}
      </div>
    )
  }
}
