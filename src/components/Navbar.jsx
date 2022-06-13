import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
      <nav className='flex py-6 text-white px-12 items-center sticky top-0 bg-slate-900 justify-between'>
        <div className='brand-logo text-3xl'>MyMovies</div>
        <div className='mx-3'>
          My Favorit List
        </div>
      </nav>
    )
  }
}

export default Navbar