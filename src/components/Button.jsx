import React, { Component } from 'react'


export default class Button extends Component {
  render() {
    return (
        <button onClick={this.props.onClick} className='bg-slate-200 dark:bg-slate-900 dark:text-white text-sm text-slate-900 hover:bg-white leading-none px-4 py-2 rounded-sm items-center flex justify-center font-bold' >
            {this.props.children}
        </button>
    )
  }
}

