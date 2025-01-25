import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../utils/firebase";
import { getAuth } from "firebase/auth";

const firebase = getFirestore(app);
const auth = getAuth(app);

const TodoList = ({ refreshTasks }) => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState(new Set());

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(firebase, "users",auth.currentUser.uid, "tasks",taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDone = (taskId) => {
    setDoneTasks((prev) => new Set([...prev, taskId]));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("User not logged in!");
        return;
      }

      try {
        const taskSnapshot = await getDocs(collection(firebase, "users", user.uid, "tasks"));
        const taskList = taskSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [refreshTasks]);

  return (
    <div className="border my-8 rounded-lg shadow-md overflow-y-scroll h-96">
      <p className="m-2 font-semibold">Title</p>
      {tasks.map(({ id, task }) => (
        <div
          key={id}
          className={`flex justify-between border p-4 my-4  ${
            doneTasks.has(id) ? "line-through text-gray-400" : ""
          }`}
        >
          <p>{task}</p>
          <div>
            <button
              className="bg-green-600 p-2 text-white rounded-lg"
              onClick={() => handleDone(id)}
            >
              Done
            </button>
            <button
              className="mx-4 bg-red-600 text-white p-2 rounded-lg"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
