import React, { Component } from 'react'

export class Button extends Component {
  render() {
    return (
        <button onClick={this.props.onClick} className='bg-slate-200 text-slate-900 hover:bg-white leading-none px-4 py-2 rounded-sm items-center flex justify-center font-bold' >
            {this.props.children}
        </button>
    )
  }
}

export default Button