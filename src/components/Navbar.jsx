import React,{useContext} from 'react'
import { RiMoonClearLine, RiSunLine } from "react-icons/ri"
import { Link } from 'react-router-dom'
import { GiStarsStack } from 'react-icons/gi'
import { ThemeContext } from '../utils/ThemeContext'

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const changeTheme = () => {
    theme === 'dark' ? setTheme('light'):setTheme('dark')
  }
    return (
      <nav className='flex justify-between py-4 text-slate-900 px-5 xl:px-9 items-center sticky top-0 z-50 border-b-[1px] border-b-slate-300 dark:border-b-black bg-slate-100 dark:bg-slate-800 dark:text-white'>
        <Link to='/' className='brand-logo text-3xl flex gap-2 items-center'>
          <GiStarsStack/>maxicorn
        </Link>
        <div className='flex items-center gap-4'>
          <Link to={'/favorite'}>My Favorit List</Link>
          <button onClick={()=>changeTheme()} className='rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 p-2 text-2xl'>
            {theme === "dark" ? <RiSunLine /> : <RiMoonClearLine />}
          </button>
        </div>
      </nav>
    )
}

export const NavbarEmpty = () =>{
  return (
    <nav className='flex justify-between py-4 text-slate-900 px-5 xl:px-9 items-center sticky top-0 z-50 border-b-[1px] border-b-slate-300 dark:border-b-black bg-slate-100 dark:bg-slate-800 dark:text-white'>
      <div className='animate-pulse h-8 w-40 bg-slate-200 dark:bg-slate-500 rounded-2xl' />
    </nav>
  )
}

export default Navbar