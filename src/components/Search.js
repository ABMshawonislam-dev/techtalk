import React from 'react'
import {BsSearch} from 'react-icons/bs'
import {BiDotsVerticalRounded} from 'react-icons/bi'
const Search = () => {
  return (
    <div className='search'>
        <input placeholder='Search'/>
        <div className='searchicon'>
            <BsSearch/>
        </div>
        <div className='menu'>
            <BiDotsVerticalRounded/>
        </div>
    </div>
  )
}

export default Search