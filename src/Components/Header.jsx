import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-between shadow-md p-4 bg-blue-500 text-white'>
        <div>
            <h1 className='font-bold text-xl cursor-pointer hover:underline'>TODO</h1>
        </div>
        <div>
            <ul className='flex'>
                <li className='mx-8 cursor-pointer'>Setting</li>
                <li className='mx-8 cursor-pointer'>Profile </li>
            </ul>
        </div>
    </div>
  )
}

export default Header