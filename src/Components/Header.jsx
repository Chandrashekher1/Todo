import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-between shadow-md p-4 bg-blue-500 text-white'>
        <div>
            <h1 className='font-bold text-xl cursor-pointer hover:underline'>TODO</h1>
        </div>
        <div>
            <ul className='flex'>
                <li className='mx-8 cursor-pointer'>Setting</li>
                <Link to="/login"><li className='mx-8 cursor-pointer'>Profile </li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Header