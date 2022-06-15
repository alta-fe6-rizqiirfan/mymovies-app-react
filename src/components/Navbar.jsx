import React, { Component } from 'react'
import { RiMoonClearLine,RiSunLine } from "react-icons/ri"

export default class Navbar extends Component {
  render() {
    return (
      <nav className='flex justify-between py-4 text-slate-900 px-5 xl:px-9 items-center sticky top-0 z-50 border-b-[1px] border-b-slate-300 dark:border-b-black bg-slate-100 dark:bg-slate-800 dark:text-white'>
        <div className='brand-logo text-3xl'>MyMovies</div>
        <div className='flex items-center gap-4'>
          <span>My Favorit List</span>
          <button onClick={this.props.onClick} className='rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 p-2 text-2xl'>{this.props.theme === "dark"? <RiSunLine /> :<RiMoonClearLine />}</button>
        </div>
      </nav>
    )
  }
}

export class NavbarEmpty extends Component{
  render() {
    return (
      <nav className='flex justify-between py-4 text-slate-900 px-5 xl:px-9 items-center sticky top-0 z-50 border-b-[1px] border-b-slate-300 dark:border-b-black bg-slate-100 dark:bg-slate-800 dark:text-white'>
        <div className='animate-pulse h-8 w-40 bg-slate-200 dark:bg-slate-500 rounded-2xl' />
      </nav>
    )
  }
}