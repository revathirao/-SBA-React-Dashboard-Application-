import React, { useState, useEffect } from "react";
import type { TaskFormProps, TaskFormData } from "../../types";
import { validateTask } from "../../utils/taskUtils";

export function TaskForm({ onAddTask, task, onEditTask }: TaskFormProps) {
   const [error, setError] = useState(""); // simple validation error
   const [formData, setFormData] = useState<TaskFormData>({
      title: "",
      description: "",
      priority: "low", // <-- "low" is a valid Priority type
      dueDate: "",
      status: "pending",
   });

   // When editing → pre-fill the form
   useEffect(() => {
      if (task) setFormData(task);
   }, [task]);

   // Single change handler for all inputs
   function handleChange(
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) {
      const { name, value } = event.target; // Destructure name and value
      setFormData((formData) => ({
         ...formData, // Spread existing state
         [name]: value, // Update changed field using computed property name
      }));
   }

   // Form submit handler
   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      const error = validateTask(formData);
      if (error) {
         setError(error);
         return; // Stop submission if there is an error
      }

      // Basic validation
      if (!formData.title.trim()) {
         setError("Title is required");
         return;
      }

      // Editing mode
      if (task && onEditTask) {
         onEditTask(formData);
         setError("");
         return; // do NOT reset form on editing
      }
      onAddTask(formData); // pass the task to parent

      //reset form
      setFormData({
         title: "",
         description: "",
         priority: "low",
         status: "pending",
         dueDate: "",
      });
      setError("");
   }

   return (
      <form onSubmit={handleSubmit} className="task-form">
         {error && <p className="error"> {error} </p>}

         {/*Task Title*/}
         <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
         />

         {/*Task Description*/}
         <input
            type="text"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
         />

         {/* Task Status */}
         <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
         </select>

         {/* Task Priority */}
         <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
         </select>

         {/* Task Priority */}
         <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
         </select>

         {/* Task Status */}
         <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
         </select>

         {/* DUE DATE */}
         <input
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
         />

         {/* SUBMIT BUTTON */}
         <button type="submit">{task ? "Update Task" : "Add Task"}</button>
      </form>
   );
}
