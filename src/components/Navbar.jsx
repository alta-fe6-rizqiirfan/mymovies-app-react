import React, { Component } from 'react'
import { RiMoonClearLine } from "react-icons/ri"

export class Navbar extends Component {
  render() {
    return (
      <nav className='flex py-4 text-slate-900 px-5 xl:px-9 items-center sticky top-0 bg-slate-100 justify-between'>
        <div className='brand-logo text-3xl'>MyMovies</div>
        <div className='flex items-center gap-4'>
          <span>My Favorit List</span>
          <button className='rounded-full bg-slate-900 text-white p-2 text-2xl'><RiMoonClearLine /></button>
        </div>
      </nav>
    )
  }
}

export default Navbar