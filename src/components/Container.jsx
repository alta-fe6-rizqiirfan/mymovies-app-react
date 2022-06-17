import React from 'react'

const Container = (props) => {
  return (
    <div className='pt-2 pb-10 px-4 xl:px-9 min-h-screen'>{props.children}</div>
  )
}

export default Container

