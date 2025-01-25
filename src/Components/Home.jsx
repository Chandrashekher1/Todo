import React, { useEffect, useRef, useState } from "react";
import TodoList from "./TodoList";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../utils/firebase";
import { getAuth } from "firebase/auth";

const firebase = getFirestore(app)
const auth = getAuth(app)

// console.log(auth.currentUser.email);


const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshTasks, setRefreshTasks] = useState(false);
  const ref = useRef(null);

  const handleAlert = () => {
    if (!auth.currentUser) { 
      alert("Please login first");
    } 
  };
  

  const handleAddButton = async (e) => {
    e.preventDefault();

    const taskValue = ref.current.value.trim();
    if (taskValue === "") return

    const user = auth.currentUser
    if (!user) {
      console.error("User not logged in!");
      return;
    }

    try {
      const tasksCollection = collection(firebase, "users", user.uid, "tasks");
      await addDoc(tasksCollection, {
        task: taskValue,
      });
      console.log("Task added successfully!");

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
    return () => clearInterval(timer)
  }, [])

  const options = { weekday: "long", month: "long", day: "numeric" }
  const formattedDate = currentTime.toLocaleDateString(undefined, options)

  return (
    <div className="m-8 w-full">
      <div>
        <h1 className="font-semibold text-xl">My Day</h1>
        <span className="text-gray-500">{formattedDate}</span>
      </div>

      <form
        className="rounded-lg w-full shadow-md border mt-8 flex p-2"
        onSubmit={handleAddButton}
      >
        <span className="border ml-4 border-blue-500 mt-5 h-4 w-4 rounded-full"></span>
        <input
          type="text"
          placeholder="Add a task"
          onClick={handleAlert}
          ref={ref}
          className="w-full p-4 outline-none bg-white rounded-lg"
        />
        <button
          type="submit"
          className="border px-8 rounded-lg bg-gray-600 text-white font-semibold"
        >
          Add
        </button>
      </form>
      <TodoList key={refreshTasks} refreshTasks={refreshTasks} />
    </div>
  );
};

export default Home;
