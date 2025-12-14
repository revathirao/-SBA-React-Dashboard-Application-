import type {
   Task,
   TaskFilterOptions,
   TaskFormData,
   TaskStatus,
   Priority,
} from "../types";

//filtering fubction
/**
 * Filters a list of tasks based on provided criteria (status, priority, search term).
 * @param tasks The array of all tasks.
 * @param filters The criteria to filter by.
 * @returns A new array containing only the tasks that match all filters.
 */

export function filterTask(tasks: Task[], filters: TaskFilterOptions) {
   return tasks.filter((task) => {
      // Filter by status
      if (filters.status !== "all" && task.status !== filters.status) {
         return false;
      }

      // Filter by priority
      if (filters.priority !== "all" && task.priority !== filters.priority) {
         return false;
      }

      // Filter by search term
      if (
         filters.search &&
         !task.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
         return false;
      }
      // If all filters pass, include the task.
      return true;
   });
}

//---------------------------------------------------------------------

//Sorting function
/**
 * Sorts a list of tasks based on a specified field (dueDate, priority, status, or none).
 * Sorting is done in ascending order for dates/priorities/statuses.
 * @param tasks The array of tasks to sort.
 * @param sortBy The field name used as the sorting key.
 * @returns A new sorted array of tasks.
 */
export function sortTask(
   tasks: Task[],
   sortBy: TaskFilterOptions["sortBy"]
): Task[] {
   const copySorted = [...tasks];

   switch (sortBy.toLowerCase()) {
      case "none":
         // When sortBy is 'none', return the tasks array as is (or the original copy)
         return copySorted;

      case "dueDate":
         // Dates need to be compared using getTime()
         return copySorted.sort(
            (a, b) =>
               new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
         );

      case "priority":
         const priorityOrder: Priority[] = ["high", "medium", "low"];
         return copySorted.sort(
            (a, b) =>
               priorityOrder.indexOf(a.priority) -
               priorityOrder.indexOf(b.priority)
         );

      case "status":
         const statusOrder: TaskStatus[] = [
            "pending",
            "in-progress",
            "completed",
         ];
         return copySorted.sort(
            (a, b) =>
               statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
         );

      default:
         return copySorted; // Fallback: return the copied array unsorted
   }
}

//-------------------------------------------------

//Validation
/**
 * Validates the input data from a task form.
 * @param data The task form data to validate.
 * @returns A string containing an error message if validation fails, or `null` if the data is valid.
 */
export function validateTask(data: TaskFormData): string | null {
   if (!data.title.trim()) {
      return "Task title is required.";
   }
   if (!data.description.trim()) {
      return "Task description is required.";
   }
   if (!data.dueDate) {
      return "Due date is required.";
   }

   // Return null if all validations pass
   return null;
}
//----------------------------------------------------------

//Date formating function
/**
 * Formats an ISO date string into a readable locale-specific string (e.g., "Nov 25, 2025").
 * @param dateString The input date string (e.g., from an HTML date input).
 * @returns A formatted date string.
 */
export function dateFormating(dateString: string) {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
   });
}
//--------------------------------------------------------------------------

//possible types for our theme variable. It can only be 'light' or 'dark'.
export type Theme = "light" | "dark";

/**
 * This function sets up theme handling for the whole app.
 * It loads the saved theme, applies it to the page,
 * and returns both the current theme and a function to toggle it.
 */
export function setupTheme() {
   // Get theme saved in the browser (if any)
   // If nothing is saved, default to "light"
   let currentTheme: Theme =
      (localStorage.getItem("theme") as Theme) || "light";

   // Apply the theme to the document <body>
   const applyTheme = (theme: Theme) => {
      // Put theme inside HTML as an attribute
      document.body.setAttribute("data-theme", theme);

      // Save it so it stays when you reload the page
      localStorage.setItem("theme", theme);
   };

   // Apply the theme immediately
   applyTheme(currentTheme);

   //Function to switch between light and dark modes
   const toggleTheme = () => {
      // If it's light, change to dark. If dark, change to light.
      if (currentTheme === "light") {
         currentTheme = "dark";
      } else {
         currentTheme = "light";
      }
      // Apply the updated theme
      applyTheme(currentTheme);

      // Return the new theme so App can update UI
      return currentTheme;
   };

   // Give back the current theme and the toggle function
   return {
      theme: currentTheme,
      toggleTheme,
   };
}
