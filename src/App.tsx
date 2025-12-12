// App.tsx
import { useState } from "react";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { setupTheme } from "./utils/taskUtils";
import type { Task, TaskFormData, TaskStatus } from "./types";

export function App() {
   //  Setup theme using your beginner-friendly function
   const { theme, toggleTheme } = setupTheme();

   // State to hold tasks
   const [tasks, setTasks] = useState<Task[]>([]);

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

   //Function to change status of a task
   const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
      setTasks(
         tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
   };

   const [filters, setFilters] = useState<TaskFilterOptions>({
      status: "all",
      priority: "all",
      search: "",
      sortBy: "dueDate",
   });

   return (
      <div>
         <Dashboard
            tasks={tasks}
            filters={filters}
            onChangeFilters={setFilters}
            onAddTask={handleAddTask}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            theme={theme}
            onToggleTheme={toggleTheme}
         />
      </div>
   );
}
