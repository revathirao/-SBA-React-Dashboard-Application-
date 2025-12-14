/**
 * Main application component (`App.tsx`) for a task management application.
 * This component manages the central state for tasks, filters, and theme settings.
 ** Key functionalities include:
 ***State Management:** Uses `useState` hooks to manage tasks, user filters, and the current theme.
 ***Persistence:** Utilizes `localStorage` to save and load tasks and filters, ensuring data persists across sessions.
 ***Provides handlers (`handleAddTask`, `handleDeleteTask`, `handleUpdateTask`, `handleStatusChange`) for managing the task data.
 ***Filter Management:** Manages and updates user preferences for filtering and sorting tasks (`handleChangeFilters`).
 ***Theming:** Integrates theme switching logic and passes the current theme state to child components.
 ***Data Flow:** Renders the primary `Dashboard` component, passing all necessary data and interaction handlers as props.
 */

import { useState } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { setupTheme } from "./utils/taskUtils";
import type {
   Task,
   TaskFormData,
   TaskStatus,
   TaskFilterOptions,
   Theme,
} from "./types";
import "./App.css";

export default function App() {
   /*-- Initialize theme settings using a utility function which handles localStorage/defaults.*/
   const { theme: initialTheme, toggleTheme: toggleThemeFromUtils } =
      setupTheme();

   /* State hook to manage the current theme (light/dark).*/
   const [theme, setTheme] = useState<Theme>(initialTheme);

   /**
    * Handles toggling the application's theme.
    * Updates local state and persists the new theme using the utility function.
    */
   const handleToggleTheme = () => {
      const newTheme = toggleThemeFromUtils();
      setTheme(newTheme);
   };

   /* --- Task Management Initialization ---*/

   /*Load tasks and filters from localStorage ONCE
    Attempt to load tasks and filters from localStorage upon initial component mount.*/

   const savedTasks = localStorage.getItem("tasks");
   const savedFilters = localStorage.getItem("filters");

   // State hook for managing the list of all tasks. Initializes from storage or an empty array.
   const [tasks, setTasks] = useState<Task[]>(
      savedTasks ? JSON.parse(savedTasks) : []
   );

   // State hook for managing the current filter/sort options. Initializes from storage or default settings.
   const [filters, setFilters] = useState<TaskFilterOptions>(
      savedFilters
         ? JSON.parse(savedFilters)
         : { status: "all", priority: "all", search: "", sortBy: "none" }
   );

   /* --- Task Handlers -----*/

   // Add Task
   /**
    * Adds a new task to the task list.
    * Generates a unique ID and updates both state and localStorage.
    * @param taskData - The form data for the new task.
    */
   const handleAddTask = (taskData: TaskFormData) => {
      const newTask: Task = {
         id: Date.now().toString(),
         title: taskData.title,
         description: taskData.description,
         dueDate: taskData.dueDate,
         priority: taskData.priority,
         status: taskData.status,
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      // Persist changes to localStorage immediately.
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Delete Task
   /**
    * Deletes a task by its ID.
    * Filters the task list and updates both state and localStorage.
    * @param id - The unique ID of the task to delete.
    */
   const handleDeleteTask = (id: string) => {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Update Task
   /**
    * Updates an existing task with new data.
    * Maps over the tasks to find and replace the specific task, then updates state and localStorage.
    * @param updated - The updated Task object.
    */
   const handleUpdateTask = (updated: Task) => {
      const updatedTasks = tasks.map((t) =>
         t.id === updated.id ? updated : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Change Status
   /**
    * Updates the status of a specific task.
    * A specialized version of `handleUpdateTask` just for status changes.
    * @param taskId - The unique ID of the task to update.
    * @param newStatus - The new status to set (e.g., 'todo', 'in-progress', 'completed').
    */
   const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
      const updatedTasks = tasks.map((t) =>
         t.id === taskId ? { ...t, status: newStatus } : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Filters
   /**
    * Updates the filter and sort settings for the task list.
    * Updates state and persists the new filters to localStorage.
    * @param newFilters - The new filter options object.
    */
   const handleChangeFilters = (newFilters: TaskFilterOptions) => {
      setFilters(newFilters);
      localStorage.setItem("filters", JSON.stringify(newFilters));
   };
   /* --- Render Dashboard -------*/
   // Renders the main Dashboard component, passing all tasks, filters, handlers, and theme props down.
   return (
      <Dashboard
         tasks={tasks}
         filters={filters}
         onChangeFilters={handleChangeFilters}
         onAddTask={handleAddTask}
         onDelete={handleDeleteTask}
         onStatusChange={handleStatusChange}
         onUpdateTask={handleUpdateTask}
         theme={theme}
         onToggleTheme={handleToggleTheme}
      />
   );
}
