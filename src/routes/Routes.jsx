import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Favorite from '../pages/Favorite';
import ErrorNoRoute from '../pages/ErrorNoRoute';

export default class RoutesApp extends Component {
  render() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:movie_id' element={<Detail />} />
                <Route path='/favorite' element={<Favorite />} />
                <Route path='*' element={<ErrorNoRoute /> } />
            </Routes>
        </BrowserRouter>
    )
  }
}
