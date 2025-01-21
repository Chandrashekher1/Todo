import React from 'react'

const TodoList = () => {
  return (
    <div className='rounded-md shadow-md my-4 h-96 border overflow-y-scroll'>
        <p className='m-2 font-semibold'>Title</p>

        <div className='flex justify-between border p-4 my-4'>
            <p>Task1</p>
            <div>
                <button className=' bg-green-600 p-2 text-white rounded-lg'>Done</button>
                <button className='mx-4 bg-red-600 text-white p-2 rounded-lg'>Delete</button>
            </div>
        </div>
    
    </div>
  )
}

export default TodoList