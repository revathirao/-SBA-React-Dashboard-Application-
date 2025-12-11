// import React from "react";
import type { DashboardProps } from "../../types";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskList } from "../TaskList/TaskList";
import { filterTask, sortTask } from  "../utils/taskUtils"

// import { TaskFilter } from "../TaskFilter/TaskFilter";
// import { UtilityDashboard } from "../UtilityDashboard/UtilityDashboard";

export function Dashboard({
   tasks,
   onAddTask,
   onDelete,
   onStatusChange,
   theme,
   onToggleTheme,
}: //    onToggleTheme,
DashboardProps) {
   return (
      <div className={`dashboard-container ${theme}`}>
         {/* Top section: Filters + Add/Edit Form */}
         <div className="Top-of-Dashboard">
            {/* Task filter */}

            {/* <TaskFilter filters={filters} onChangeFilters={onChangeFilters} /> */}
            {/* Task form */}

            <TaskForm onAddTask={onAddTask} />
         </div>

         {/* Main content */}
         <div className="Main-dashboard">
            {/* Task list */}
            <TaskList
               tasks={tasks}
               onStatusChange={onStatusChange}
               onDelete={onDelete}
            />

            <button onClick={onToggleTheme} className="theme-toggle-btn">
               Toggle {theme === "light" ? "Dark" : "Light"} Mode
            </button>
         </div>
      </div>
   );
}
