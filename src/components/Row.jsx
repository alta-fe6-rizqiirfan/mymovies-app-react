import React, { Component } from 'react'
import Label from './Label'
import { FaStar,FaPlay } from 'react-icons/fa'

export class FavoritRow extends Component {
  render() {
      return (
        <div className='mb-6'>
            <Label> <FaStar />Favorite List</Label>
            <div className='flex overflow-y-scroll gap-2 '>
                {this.props.children}
            </div>
        </div>
    )
  }
}

export class EmptyRow extends Component {
  render() {
    return (
      <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 pt-4'>
        {this.props.children}
      </div>
    )
  }
}

export class NowPlayingRow extends Component {
  render() {
      return (
        <>
            <Label><FaPlay className='text-xs mr-1'/> Now Playing</Label>
            <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2'>
                {this.props.children}
            </div>
        </>
    )
  }
}
