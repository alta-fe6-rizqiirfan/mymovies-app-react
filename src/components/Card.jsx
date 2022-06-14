import React, { Component } from 'react'
import Button from './Button'
import { FaStar,FaPlus,FaTrash } from "react-icons/fa";

export class Card extends Component {
  render() {
    return (
    <div className='flex flex-col  min-w-[50%] xl:min-w-[15%] justify-between bg-slate-800 p-3 text-white'>
        <img src={this.props.poster} alt="" />
        <div className='flex justify-between my-2 font-bold items-end text-sm'>
            <p>{this.props.title} ({this.props.release})
            </p>
            <p className='flex items-center'><FaStar className='mr-1' /> {this.props.rating}</p>
        </div>
        <Button onClick={this.props.onClick}><FaPlus className='mr-1'/>Add to favorite</Button>    
    </div>
    )
  }
}

export class Card2 extends Component {
  render() {
    return (
    <div className='flex flex-col w-[50%] min-w-[50%] md:w-[25%] md:min-w-[25%] xl:w-[16%] xl:min-w-[16%] justify-between bg-slate-800 p-3 text-white '>
        <img src={this.props.poster} alt="" />
        <div className='flex justify-between my-2 font-bold items-end text-sm'>
            <p>{this.props.title} ({this.props.release}) {this.props.key}
            </p>
            <p className='flex items-center'><FaStar className='mr-1' /> {this.props.rating}</p>
        </div>
        <Button onClick={this.props.onClick}><FaTrash className='mr-1' />Delete</Button>    
    </div>
    )
  }
}
