import { useState } from "react";
import type {
   DashboardProps,
   TaskFilterOptions,
   Task,
   TaskFormData,
} from "../../types";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskList } from "../TaskList/TaskList";
import { filterTask, sortTask } from "../../utils/taskUtils";
import { TaskFilter } from "../TaskFilter/TaskFilter";

// Extend DashboardProps to include filters and onChangeFilters
interface DashboardWithFiltersProps extends DashboardProps {
   filters: TaskFilterOptions; // current filter values
   onChangeFilters: (filters: TaskFilterOptions) => void; // handler to update filters
   onUpdateTask: (task: Task) => void;
}

export function Dashboard({
   tasks,
   filters,
   onAddTask,
   onDelete,
   onStatusChange,
   onChangeFilters,
   theme,
   onUpdateTask,
   onToggleTheme,
}: DashboardWithFiltersProps) {
  
   const [editingTask, setEditingTask] = useState<Task | null>(null);

   const handleEditTask = (updated: TaskFormData) => {
      if (!editingTask) return;

      const updatedTask: Task = {
         ...editingTask,
         ...updated, // overwrite title, description, priority, dueDate, status
      };

      // setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      onUpdateTask(updatedTask);
      setEditingTask(null); // clear editing state
   };

   // Apply filtering and sorting
   const filteredTasks = filterTask(tasks, filters);

   const sortedTasks = sortTask(filteredTasks, filters.sortBy);

   console.log(
      "Dashboard rendering with sort by:",
      filters.sortBy,
      "and task order:",
      sortedTasks.map((t) => t.title)
   );

   //Compute task statistics
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter((t) => t.status === "completed").length;
   const pendingTasks = tasks.filter((t) => t.status === "pending").length;
   const inProgressTasks = tasks.filter(
      (t) => t.status === "in-progress"
   ).length;

   return (
      <div className={`dashboard-container ${theme}`}>
         {/* Top section: Filters + Add/Edit Form */}
         <div className="Top-of-Dashboard">
            {/* Task filter */}
            <TaskFilter filters={filters} onChangeFilters={onChangeFilters} />

            {/* Task form */}
            <TaskForm
               onAddTask={onAddTask}
               onEditTask={handleEditTask}
               task={editingTask || undefined}
            />
         </div>

         {/* Task statistics */}
         <div className="task-stats">
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed: {completedTasks}</p>
            <p>Pending: {pendingTasks}</p>
            <p>In Progress: {inProgressTasks}</p>
         </div>

         {/* Main content */}
         <div className="Main-dashboard">
            {/* Task list */}
            <TaskList
               tasks={sortedTasks} // now TaskList shows filtered + sorted tasks
               onStatusChange={onStatusChange}
               onDelete={onDelete}
               onEditTask={(task) => setEditingTask(task)}
            />

            {/* Theme toggle */}
            <button onClick={onToggleTheme} className="theme-toggle-btn">
               Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
         </div>
      </div>
   );
}
