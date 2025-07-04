import React, { useState, useEffect } from "react";
import "./Intro.css";
import { upload } from "@testing-library/user-event/dist/upload";

const Intro = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  // Handles form submission
  const handleSubmit = () => {
    if (input !== "") {
      addTaskToArray(input);
      setInput(""); // Clear input field
    }
    else{
      alert("cant enter empty task")
    }
  };

  const addTaskToArray = (taskText) => {
    const task = {
      id: Date.now(), // Unique ID for each task
      title: taskText,
      completed: false,
    };

    // Update the tasks state and save to localStorage
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save as a string
  };

  console.log(tasks)

  const handledelete =(id)=>{
    const allow=window.confirm("you want to delete this task");
   if(allow){
    const tasksToDelete= JSON.parse(localStorage.getItem("tasks"));
   const newtasks=tasksToDelete.filter(task=>task.id!==id);
     setTasks(newtasks);
    localStorage.setItem("tasks", JSON.stringify(newtasks)); // Save as a string
   }

  }

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data)); // Parse the JSON string into an array
    }
  }, []);

  return (
    <div className="container">
      <div className="form">
        <input
          type="text"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input state
        />
        <input
          type="submit"
          className="add-task"
          value="Add Task"
          onClick={handleSubmit} // Add task on button click
        />
      </div>
      <div className="tasks">
        {/* Dynamically render tasks */}
        {tasks.map((task) => (
          <div key={task.id} className="task">
            {task.title}
           <span onClick={() => handledelete(task.id)}>Delete</span>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intro;
