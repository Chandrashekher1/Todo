import React, { useEffect, useState } from 'react'
import TodoList from './TodoList';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Home = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString(undefined, options);

  return (
    <div className='m-8 w-full'>
        <div>
            <h1 className='font-semibold text-xl'>My Day</h1>
            <span className='text-gray-500'>{formattedDate}</span>
        </div>

        <div className='rounded-lg w-full shadow-md border mt-8 flex p-2'>
          <span className='border ml-4  border-blue-500 mt-5 h-4 w-4 rounded-full'></span>
          <input 
            type="text"
            placeholder='Add a task'
            className='w-full p-4  outline-none bg-white rounded-lg '
           />
           <button className='border px-8 rounded-lg bg-gray-600 text-white font-semibold'>Add</button>
        </div>
        <TodoList/>
    </div>
  );
}

export default Home