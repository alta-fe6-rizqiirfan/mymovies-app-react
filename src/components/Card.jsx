import React, { Component } from 'react'
import Button from './Button'
import { FaStar,FaPlus} from "react-icons/fa";

export class Card extends Component {
  render() {
    return (
    <div className='flex flex-col min-w-[50%] xl:min-w-[15%] bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white'>
        <div className='flex-1'>
          <div className='text-xs font-bold relative'>
            <div className='absolute top-0 right-0 z-10'>
              <div className='flex items-center p-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-white'>
                <FaStar className='mr-1' /> {this.props.rating % 1 === 0 ? this.props.rating + '.0' : this.props.rating}
              </div>
            </div>
            <img src={this.props.poster === undefined ? "https://via.placeholder.com/500x750?text=No+Image" : 'https://image.tmdb.org/t/p/w500' + this.props.poster} alt="" />
          </div>
          <div className=' my-2 text-sm '>
            <p className='font-bold line-clamp-2'>{this.props.title}
            </p>
            ({this.props.release ? this.props.release.split('-')[0] : ''})
          </div>
        </div>
        <Button onClick={this.props.onClick}><FaPlus className='mr-1' />Add to favorite</Button>   
    </div>
    )
  }
}

export class EmptyCard extends Component {
  render() {
    return (
        <div id={this.props.key} className="animate-pulse border dark:border-none bg-white dark:bg-slate-800 shadow p-4 max-w-sm w-full mx-auto h-72 flex flex-col justify-end rounded-lg">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded"></div>
                </div>
                </div>
            </div>
        </div>
    )
  }
}
