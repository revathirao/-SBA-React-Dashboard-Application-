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

// Define local props interface by extending the base DashboardProps with filter/update andn onChangeFilters handlers
interface DashboardWithFiltersProps extends DashboardProps {
   filters: TaskFilterOptions; // current filter values
   onChangeFilters: (filters: TaskFilterOptions) => void; // handler to update filters
   onUpdateTask: (task: Task) => void;
}

/**
 * The main layout and logic container for the task application.
 * It manages the display logic (filtering and sorting), task editing state,
 * statistics display, and orchestrates interactions between child components (Form, List, Filter).
 */
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
   // Local state to track which task is currently being edited (null if in 'add' mode)
   const [editingTask, setEditingTask] = useState<Task | null>(null);

   /**
    * Handles the submission of an edited task from the TaskForm.
    * Merges the form data with the currently editing task's ID, updates the main task list
    * via the `onUpdateTask` prop (which updates App.tsx state), and clears the editing state.
    * @param updated The form data containing updated title, description, etc.
    */
   const handleEditTask = (updated: TaskFormData) => {
      if (!editingTask) return; // Should not happen if form is used correctly in edit mode

      const updatedTask: Task = {
         ...editingTask,
         ...updated, // overwrite title, description, priority, dueDate, status
      };
      // Call the parent handler to persist this update
      onUpdateTask(updatedTask);
      setEditingTask(null); // clear editing state
   };

   //----  filtering and sorting
   // These steps process the raw tasks data into a viewable list based on user filters.

   // Apply filtering based on search, status, and priority
   const filteredTasks = filterTask(tasks, filters);

   // Apply sorting to the *already filtered* list
   const sortedTasks = sortTask(filteredTasks, filters.sortBy);

   //Compute task statistics for display
   const totalTasks = tasks.length;
   const completedTasks = tasks.filter((t) => t.status === "completed").length;
   const pendingTasks = tasks.filter((t) => t.status === "pending").length;
   const inProgressTasks = tasks.filter(
      (t) => t.status === "in-progress"
   ).length;

   // --- Render UI ---
   return (
      <div className={`dashboard-container ${theme}`}>
         <div className="header-container" style={{ padding: "20px" }}>
            <h1>Task Manager</h1>

            {/* Theme toggle */}
            <button onClick={onToggleTheme} className="theme-toggle-btn">
               <i className="fas fa-sun"></i>{" "}
               {/* This icon changes based on theme state */}
               {/* Toggle {theme === "light" ? "Dark" : "Light"} Mode used as abutton but did not fit so commented it*/}
            </button>
         </div>

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
         </div>
      </div>
   );
}
