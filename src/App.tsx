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

// export default function App() {
//    // Get theme + toggle function from utility
//    const { theme: initialTheme, toggleTheme: toggleThemeFromUtils } =
//       setupTheme();

//    // Local state inside App
//    const [theme, setTheme] = useState<Theme>(initialTheme);

//    // App wrapper for toggling
//    const handleToggleTheme = () => {
//       const newTheme = toggleThemeFromUtils();
//       setTheme(newTheme);
//    };

//    // State to hold tasks/Load task  from loacl storage if available
//    const [tasks, setTasks] = useState<Task[]>(() => {
//       const saved = localStorage.getItem("tasks");
//       return saved ? JSON.parse(saved) : [];
//    });

//    const [filters, setFilters] = useState<TaskFilterOptions>(() => {
//       // Get saved filters from localStorage
//       const saved = localStorage.getItem("filters");

//       // If found, parse and return it; otherwise, return default values
//       return saved
//          ? JSON.parse(saved)
//          : { status: "all", priority: "all", search: "", sortBy: "none" };
//    });
//    // console.log("App.tsx rendering. Current sortBy value:", filters.sortBy);

//    // Save tasks to localStorage whenever they change
//    useEffect(() => {
//       localStorage.setItem("tasks", JSON.stringify(tasks));
//    }, [tasks]);

//    // Save filters to localStorage whenever they change
//    useEffect(() => {
//       localStorage.setItem("filters", JSON.stringify(filters));
//    }, [filters]);

//    // Function to add a task
//    const handleAddTask = (taskData: TaskFormData) => {
//       const newTask: Task = {
//          id: Date.now().toString(), // simple unique ID
//          title: taskData.title,
//          description: taskData.description,
//          dueDate: taskData.dueDate,
//          priority: taskData.priority,
//          status: taskData.status,
//       };
//       setTasks([...tasks, newTask]);
//    };

//    //Function to delete a task
//    const handleDeleteTask = (id: string) => {
//       setTasks(tasks.filter((t) => t.id !== id));
//    };

//    const handleUpdateTask = (updated: Task) => {
//       setTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
//    };

//    //Function to change status of a task
//    const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
//       setTasks(
//          tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
//       );
//    };

//    return (
//       <div>
//          <Dashboard
//             tasks={tasks}
//             filters={filters}
//             onChangeFilters={setFilters}
//             onAddTask={handleAddTask}
//             onDelete={handleDeleteTask}
//             onStatusChange={handleStatusChange}
//             onUpdateTask={handleUpdateTask}
//             theme={theme}
//             onToggleTheme={handleToggleTheme}
//          />
//       </div>
//    );
// }

export default function App() {
   const { theme: initialTheme, toggleTheme: toggleThemeFromUtils } =
      setupTheme();

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

   // console.log("App.tsx rendering. Current sortBy value:", filters.sortBy);

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
      <div>
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
      </div>
   );
}
