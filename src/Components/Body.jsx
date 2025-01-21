import React from 'react'
import Menu from './Menu'
import Home from './Home'

const Body = () => {
  return (
    <div className='flex'>
        <Menu/>
        <Home />
    </div>
  )
}

export default Body