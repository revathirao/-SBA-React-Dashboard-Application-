import React, { useState, useEffect } from "react";
import type { TaskFormProps, TaskFormData } from "../../types";
import { validateTask } from "../../utils/taskUtils";

/**
 * TaskForm component renders a controlled form for adding a new task or editing an existing one.
 * It manages local form state, handles input changes, validates data, and calls appropriate
 * parent handlers (`onAddTask` or `onEditTask`) upon submission.
 */
export function TaskForm({ onAddTask, task, onEditTask }: TaskFormProps) {
   // State hook for managing simple validation error messages
   const [error, setError] = useState(""); // simple validation error

   // State hook for managing all form inputs as a single `formData` object
   const [formData, setFormData] = useState<TaskFormData>({
      title: "",
      description: "",
      priority: "low", // <-- "low" is a valid Priority type
      dueDate: "",
      status: "pending",
   });

   // useEffect → resets form after editing
   useEffect(() => {
      if (task) {
         setFormData(task); // editing mode
      } else {
         setFormData({
            title: "",
            description: "",
            priority: "low",
            dueDate: "",
            status: "pending",
         });
      }
   }, [task]); // Dependency array ensures this runs only when the `task` prop reference changes

   /**
    * Single change handler function for all form inputs (input, select, textarea if any).
    * Uses computed property names to update the specific field in the `formData` state.
    * @param event The React change event from the input or select element.
    */
   function handleChange(
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) {
      const { name, value } = event.target; // Destructure name and value
      setFormData((formData) => ({
         ...formData, // Spread existing state
         [name]: value, // Update changed field using computed property name
      }));
   }

   /**
    * Form submit handler. Prevents default browser submission, validates data,
    * and determines whether to call `onAddTask` (add mode) or `onEditTask` (edit mode).
    * @param event The React form submission event.
    */
   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();

      // Use the utility validation function (from taskUtils.ts)
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
      // Check if we are in editing mode (the `task` prop is present) and have an edit handler
      if (task && onEditTask) {
         onEditTask(formData); // Call the parent's edit handler with the form data the useEffect handles resetting when `task` goes back to null
         setError(""); // Clear any previous errors
         return; // do NOT reset form on editing
      }

      // Add mode
      // If not editing, we are adding a new task
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
         {/* Display validation error if present */}
         {error && <p className="error"> {error} </p>}

         {/*Task Title*/}
         <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
         />

         {/*T*/}
         <input
            type="text"
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
         />

         {/* TASK STATUS */}
         <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
         </select>

         {/* TASK PRIORITY   */}
         <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
         </select>

         {/* DUE DATE */}
         <div className="date-button-wrapper">
            <input
               className="due-date-input"
               name="dueDate"
               type="date"
               value={formData.dueDate}
               onChange={handleChange}
            />

            {/* SUBMIT BUTTON */}
            <button type="submit">{task ? "Update Task" : "Add Task"}</button>
         </div>
      </form>
   );
}
