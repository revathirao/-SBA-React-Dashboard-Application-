import React from "react";
import type { TaskFilterProps } from "../../types";

// TaskFilter component allows users to filter tasks by search text, status, and priority
export function TaskFilter({ filters, onChangeFilters }: TaskFilterProps) {
   /* Function to handle when the user changes the task status filter
    * It updates the parent component with the new filter values.
    * e.target.value contains the selected value from the dropdown (e.g., "pending", "completed")
    * create a new filter object by copying all existing filters (...filters)
    * and updating only the 'status' property with the new value
    * 'as typeof filters.status' tells TypeScript that the value is a valid TaskStatus type*/
   const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeFilters({
         ...filters,
         status: e.target.value as typeof filters.status,
      });
   };

   /* Function to handle when the user changes the task priority filter
    It updates the parent component with the new filter values*/
   const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeFilters({
         ...filters,
         priority: e.target.value as typeof filters.priority,
      });
   };

   // Function to clear a specific filter
   //    const clearFilter = (filterName: keyof typeof filters) => {
   //       const newFilters = {
   //          ...filters,
   //          [filterName]: filterName === "search" ? "" : "all",
   //       };
   //       onChangeFilters(newFilters);
   //    };

   /* Handler for when the user types in the search input
    * e.target.value contains the search text
    * Updates only the 'search' property in the filters object
    * Calls onChangeFilters to update the parent component */
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeFilters({
         ...filters,
         search: e.target.value as typeof filters.search,
      });
   };

   return (
      // Container div for the TaskFilter component
      <div className="task-filter" style={{ marginBottom: "1rem" }}>
         {/* Search input for filtering tasks by text */}
         <input
            type="text"
            placeholder="search tasks..."
            value={filters.search} // Controlled select tied to filters.priority
            onChange={handleSearchChange} // Calls the handler when priority changes
            style={{ marginRight: "1rem" }}
         />
         <label style={{ marginLeft: "20px" }}>
            Sort By:{" "}
            <select
               value={filters.sortBy}
               onChange={(e) =>
                  onChangeFilters({
                     ...filters,
                     sortBy: e.target.value as typeof filters.sortBy,
                  })
               }>
               <option value="dueDate">Due Date</option>
               <option value="priority">Priority</option>
               <option value="status">Status</option>
            </select>
         </label>

         {/* Dropdown to filter tasks by status */}
         {/*
          * A dropdown menu (select input) that displays and changes the task's current status.
          ** 'value={task.status}' sets the initially selected option based on the task's data.
          ** 'onChange={handleStatusSelect}' binds the user's status change action
          * to the 'handleStatusSelect' function defined above in the component logic.
          */}
         <label style={{ marginLeft: "20px" }}>
            Status:{" "}
            <select
               value={filters.status}
               onChange={handleStatusChange}
               className="task-filter-status">
               <option value="all">All Statuses</option>
               <option value="pending">Pending</option>
               <option value="completed">Completed</option>
               <option value="in-progress">In Progress</option>
            </select>
         </label>

         {/* Dropdown to filter tasks by priority */}
         <label style={{ marginLeft: "20px" }}>
            Priority:{" "}
            <select
               value={filters.priority}
               onChange={handlePriorityChange}
               className="task-filter-priority">
               <option value="all">All Priorities</option>
               <option value="low">Low</option>
               <option value="medium">Medium</option>
               <option value="high">High</option>
            </select>
         </label>
      </div>
   );
}
