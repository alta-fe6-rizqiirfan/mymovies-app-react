import React from 'react'
import Label from './Label'
import { FaPlay } from 'react-icons/fa'

export const HeadlineRow = (props) =>{
    return (
      <div className='mb-6'>
          <div className='flex bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-col-reverse xl:flex-row'>
              {props.children}
          </div>
      </div>
  )
}

export const EmptyRow = (props) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 pt-4'>
      {props.children}
    </div>
  )
}

export const NowPlayingRow = (props) => {
    return (
      <>
          <Label><FaPlay className='text-xs mr-1'/> Now Playing</Label>
          <div className='grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2'>
              {props.children}
          </div>
      </>
    )
}

export const SimilarRow = (props) =>{
    return (
      <>
          <Label><FaPlay className='text-xs mr-1'/> Similar Movies</Label>
          <div className='flex overflow-y-scroll gap-2 '>
              {props.children}
          </div>
      </>
  )
}
