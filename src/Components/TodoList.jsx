import React, { useState, useEffect } from "react";
import { collection, getDocs, getFirestore, doc, deleteDoc } from "firebase/firestore";
import { app } from "../utils/firebase";

const firebase = getFirestore(app);

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState(new Set())

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebase, "users"));
      const taskList = [];
      querySnapshot.forEach((doc) => {
        const taskData = doc?.data()?.task;
        taskList.push({ id: doc.id, task: taskData });
      });
      setTasks(taskList);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(firebase, "users", taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setDoneTasks((prev) => {
        const updated = new Set(prev);
        updated.delete(taskId)
        return updated
      });
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  };

  const handleStyle = (taskId) => {
    setDoneTasks((prev) => {
      const updated = new Set(prev)
      if (updated.has(taskId)) {
        updated.delete(taskId)
      } else {
        updated.add(taskId)
      }
      return updated;
    });
  };

  return (
    <div className="rounded-md shadow-md my-4 h-96 border overflow-y-scroll">
      <p className="m-2 font-semibold">Title</p>

      {tasks.map(({ id, task }) => (
        <div key={id} className="flex justify-between border p-4 my-4 hover:bg-gray-100">
          <p className={doneTasks.has(id) ? "line-through text-gray-500" : ""}>{task}</p>
          <div>
            <button
              className="bg-green-600 p-2 text-white rounded-lg"
              onClick={() => handleStyle(id)}
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