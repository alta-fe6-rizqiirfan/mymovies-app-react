import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}
      className='bg-gradient-to-l from-lime-400 to-cyan-400 text-sm text-slate-900
      hover:from-cyan-400 hover:to-lime-400 px-4 py-2
      rounded-[0.2rem] items-center flex justify-center
      font-bold' >
          {props.children}
      </button>
  )
}

export const ButtonFav = (props) => {
  return (
    <button onClick={props.onClick}
      className='bg-gradient-to-l from-red-600 to-red-900 text-sm text-white
      hover:from-red-900 hover:to-red-800 px-4 py-2
      rounded-[0.2rem] items-center flex justify-center
      font-bold' >
          {props.children}
      </button>
  )
}

export default Button

