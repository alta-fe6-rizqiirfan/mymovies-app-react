import React from 'react'
import Button from './Button'
import { FaStar,FaPlus} from "react-icons/fa";

export const Card = (props) => {
    return (
    <div className='flex flex-col min-w-[50%] xl:min-w-[15%] bg-white dark:bg-slate-800 p-3 text-slate-900 dark:text-white'>
        <div className='flex-1'>
          <div className='text-xs font-bold relative'>
            <div className='absolute top-0 right-0 z-10'>
              <div className='flex items-center p-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-white'>
                <FaStar className='mr-1' /> {props.rating.toFixed(1)}
              </div>
            </div>
            <img className='cursor-pointer' onClick={props.goToDetail} src={props.poster === undefined ? "https://via.placeholder.com/500x750?text=No+Image" : 'https://image.tmdb.org/t/p/w500' + props.poster} alt="" />
          </div>
          <div className=' my-2 text-sm '>
            <p onClick={props.goToDetail} className='cursor-pointer font-bold line-clamp-2'>{props.title}
            </p>
            <span onClick={props.goToDetail} className='cursor-pointer'> ({props.release ? props.release.split('-')[0] : ''})</span>
          </div>
        </div>
        <Button onClick={props.onClick}><FaPlus className='mr-1' />Add to favorite</Button>   
    </div>
    )
}

export const EmptyCard = () => {
  return (
      <div className="animate-pulse border dark:border-none bg-white dark:bg-slate-800 shadow p-4 max-w-sm w-full mx-auto h-72 flex flex-col justify-end rounded-lg">
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
