import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../utils/firebase";


const firebase = getFirestore(app);

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const ref = useRef(null);
  const [refreshTasks, setRefreshTasks] = useState(false)

  const handleAddButton = async (e) => {
    e.preventDefault()
    if(ref.current.value === "") return
    
    try {
      await addDoc(collection(firebase, "users"), {
        task: ref.current.value,
      });
      ref.current.value = ""
      setRefreshTasks((prev) => !prev)
    } catch (error) {
      console.error("Error adding task:", error)
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = currentTime.toLocaleDateString(undefined, options);

  return (
    <div className="m-8 w-full">
      <div>
        <h1 className="font-semibold text-xl">My Day</h1>
        <span className="text-gray-500">{formattedDate}</span>
      </div>

      <form className="rounded-lg w-full shadow-md border mt-8 flex p-2" onSubmit={handleAddButton}>
        <span className="border ml-4 border-blue-500 mt-5 h-4 w-4 rounded-full"></span>
        <input
          type="text"
          placeholder="Add a task"
          ref={ref}
          className="w-full p-4 outline-none bg-white rounded-lg"
        />
        <button
          className="border px-8 rounded-lg bg-gray-600 text-white font-semibold"
          // onClick={handleAddButton}
        >
          Add
        </button>
      </form>
      <TodoList key={refreshTasks} />
    </div>
  );
};

export default Home;
