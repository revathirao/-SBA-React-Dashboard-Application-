// // App.tsx
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
   // Initialize theme settings using a utility function which handles localStorage/defaults.
   const { theme: initialTheme, toggleTheme: toggleThemeFromUtils } =
      setupTheme();

   // State hook to manage the current theme (light/dark).
   const [theme, setTheme] = useState<Theme>(initialTheme);

   const handleToggleTheme = () => {
      const newTheme = toggleThemeFromUtils();
      setTheme(newTheme);
   };

   // Load tasks and filters from localStorage ONCE
   const savedTasks = localStorage.getItem("tasks");
   const savedFilters = localStorage.getItem("filters");

   const [tasks, setTasks] = useState<Task[]>(
      savedTasks ? JSON.parse(savedTasks) : []
   );

   const [filters, setFilters] = useState<TaskFilterOptions>(
      savedFilters
         ? JSON.parse(savedFilters)
         : { status: "all", priority: "all", search: "", sortBy: "none" }
   );

   // Add Task
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
      // Save immediately
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Delete Task
   const handleDeleteTask = (id: string) => {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Update Task
   const handleUpdateTask = (updated: Task) => {
      const updatedTasks = tasks.map((t) =>
         t.id === updated.id ? updated : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Change Status
   const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
      const updatedTasks = tasks.map((t) =>
         t.id === taskId ? { ...t, status: newStatus } : t
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
   };

   // Filters
   const handleChangeFilters = (newFilters: TaskFilterOptions) => {
      setFilters(newFilters);
      localStorage.setItem("filters", JSON.stringify(newFilters));
   };

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
