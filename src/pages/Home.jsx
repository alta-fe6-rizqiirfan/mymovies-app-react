import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export class Home extends Component {
  render() {
    return (
        <>
            <Navbar />
            <div className='h-screen overflow-auto py-1 px-9'>
                <div className='flex'>
                    <span className='border-l-8 font-bold border-red-900 bg-white px-3 py-1'> Now Playing </span>
                </div>
                <div className='mt-8 flex w-full justify-between'>
                    <div className='w-1/6 bg-slate-800 p-3 text'>
                        <div className='h-60 w-full bg-white'></div>
                        <div className='flex justify-between text-white mt-2'>
                            <div>Avengers (2012)</div>
                            <div>4.5</div>
                        </div>
                    </div>
                    <div className='w-1/6 bg-slate-800 p-3 text'>
                        <div className='h-60 w-full bg-white'></div>
                        <div className='flex justify-between text-white mt-2'>
                            <div>Avengers (2012)</div>
                            <div>4.5</div>
                        </div>
                    </div>
                    <div className='w-1/6 bg-slate-800 p-3 text'>
                        <div className='h-60 w-full bg-white'></div>
                        <div className='flex justify-between text-white mt-2'>
                            <div>Avengers (2012)</div>
                            <div>4.5</div>
                        </div>
                    </div>
                    <div className='w-1/6 bg-slate-800 p-3 text'>
                        <div className='h-60 w-full bg-white'></div>
                        <div className='flex justify-between text-white mt-2'>
                            <div>Avengers (2012)</div>
                            <div>4.5</div>
                        </div>
                    </div>
                    <div className='w-1/6 bg-slate-800 p-3 text'>
                        <div className='h-60 w-full bg-white'></div>
                        <div className='flex justify-between text-white mt-2'>
                            <div>Avengers (2012)</div>
                            <div>4.5</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
  }
}

export default Home