import React, {useMemo, useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { reduxAction } from '../utils/redux/actions/action';

import { ThemeContext } from '../utils/ThemeContext';

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Favorite from '../pages/Favorite';
import ErrorNoRoute from '../pages/ErrorNoRoute';

const RoutesApp = () => {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState('light')
  const bg = useMemo(() => ({ theme, setTheme }), [theme])
  
  useEffect(() => {
    const storageFavorite = localStorage.getItem("favoriteMov")
    if (storageFavorite) {
      dispatch(reduxAction("SET_FAVORITE",JSON.parse(storageFavorite)))
    }
  },[])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    } 

  }, [theme])

  return (
    <ThemeContext.Provider value={bg}>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movie/:movie_id' element={<Detail />} />
              <Route path='/favorite' element={<Favorite />} />
              <Route path='*' element={<ErrorNoRoute /> } />
          </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default RoutesApp
