import React from 'react'

const Page = (props) => {
  return (
      <div className='bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-white'>
          {props.children}
    </div>
  )
}
export default Page