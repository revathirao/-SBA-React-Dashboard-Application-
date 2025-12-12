// import React from "react";
import type { DashboardProps, TaskFilterOptions } from "../../types";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskList } from "../TaskList/TaskList";
import { filterTask, sortTask } from "../../utils/taskUtils";
import { TaskFilter } from "../TaskFilter/TaskFilter";

// Extend DashboardProps to include filters and onChangeFilters
interface DashboardWithFiltersProps extends DashboardProps {
   filters: TaskFilterOptions; // current filter values
   onChangeFilters: (filters: TaskFilterOptions) => void; // handler to update filters
}

export function Dashboard({
   tasks,
   filters,
   onAddTask,
   onDelete,
   onStatusChange,
   onChangeFilters,
   theme,
   onToggleTheme,
}: DashboardWithFiltersProps) {
   //  Apply filtering and sorting
   const filteredTasks = filterTask(tasks, filters);
   const sortedTasks = sortTask(filteredTasks, filters.sortBy);

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
            <TaskForm onAddTask={onAddTask} />
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
            />

            {/* Theme toggle */}
            <button onClick={onToggleTheme} className="theme-toggle-btn">
               Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
         </div>
      </div>
   );
}
