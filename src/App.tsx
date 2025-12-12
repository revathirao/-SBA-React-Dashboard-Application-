// App.tsx
import { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { setupTheme } from "./utils/taskUtils";
import type {
   Task,
   TaskFormData,
   TaskStatus,
   TaskFilterOptions,
   Theme,
} from "./types";

export default function App() {
   //    // const { theme: initialTheme, toggleTheme: rawToggleTheme } = setupTheme();

   //    //  Setup theme using your beginner-friendly function
   //    const { theme, toggleTheme } = setupTheme();

   // const toggleTheme = () => {
   //    const newTheme = rawToggleTheme();
   //    setTheme(newTheme);
   // };
   //    // Wrap toggleTheme to update React state
   //   const toggleTheme = () => {
   //     const newTheme = rawToggleTheme(); // updates localStorage and body attribute
   //     setTheme(newTheme); // triggers React re-render
   //   };

   // Get theme + toggle function from utility
   const { theme: initialTheme, toggleTheme: toggleThemeFromUtils } =
      setupTheme();

   // Local state inside App
   const [theme, setTheme] = useState<Theme>(initialTheme);

   // App wrapper for toggling
   const handleToggleTheme = () => {
      const newTheme = toggleThemeFromUtils();
      setTheme(newTheme);
   };

   // State to hold tasks/Load task  from loacl storage if available
   const [tasks, setTasks] = useState<Task[]>(() => {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
   });

   const [filters, setFilters] = useState<TaskFilterOptions>(() => {
      // Try to get saved filters from localStorage
      const saved = localStorage.getItem("filters");

      // If found, parse and return it; otherwise, return default values
      return saved
         ? JSON.parse(saved)
         : { status: "all", priority: "all", search: "", sortBy: "none" };
   });

   // Save tasks to localStorage whenever they change
   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
   }, [tasks]);

   // Save filters to localStorage whenever they change
   useEffect(() => {
      localStorage.setItem("filters", JSON.stringify(filters));
   }, [filters]);

   // Function to add a task
   const handleAddTask = (taskData: TaskFormData) => {
      const newTask: Task = {
         id: Date.now().toString(), // simple unique ID
         title: taskData.title,
         description: taskData.description,
         dueDate: taskData.dueDate,
         priority: taskData.priority,
         status: taskData.status,
      };
      setTasks([...tasks, newTask]);
   };

   //Function to delete a task
   const handleDeleteTask = (id: string) => {
      setTasks(tasks.filter((t) => t.id !== id));
   };

   const handleUpdateTask = (updated: Task) => {
      setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
   };

   //Function to change status of a task
   const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
      setTasks(
         tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
   };

   return (
      <div>
         <Dashboard
            tasks={tasks}
            filters={filters}
            onChangeFilters={setFilters}
            onAddTask={handleAddTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            onUpdateTask={handleUpdateTask}
            theme={theme}
            onToggleTheme={handleToggleTheme}
         />
      </div>
   );
}
