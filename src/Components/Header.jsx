import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleLogo = () => {
    navigate("/")
  }

  return (
    <div className='flex justify-between shadow-md p-4 bg-blue-500 text-white'>
        <div>
            <h1 className='font-bold text-xl cursor-pointer hover:underline' onClick={handleLogo}>TODO</h1>
        </div>
        <div>
            <ul className='flex'>
                <li className='mx-4 cursor-pointer md:mx-8'>Setting</li>
                <Link to="/login"><li className='mx-4 cursor-pointer md:mx-8'>Profile </li></Link>
            </ul>
        </div>
    </div>
  )
}

export default Header