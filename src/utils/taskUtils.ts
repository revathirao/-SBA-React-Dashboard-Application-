import type {
   Task,
   TaskFilterOptions,
   TaskFormData,
   TaskStatus,
   Priority,
} from "../types";

//filtering fubction

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

      return true;
   });
}

//---------------------------------------------------------------------

//Sorting function
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
         return copySorted;
   }
}

//-------------------------------------------------

//Validation

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

   return null;
}
//----------------------------------------------------------

// export function dateFormating(dateString: string) {
//    const date = new Date(dateString);
//    const yyyy = date.getFullYear();
//    const mm = String(date.getMonth() + 1).padStart(2, "0"); // 01-12
//    const dd = String(date.getDate()).padStart(2, "0"); // 01-31
//    return `${yyyy}-${mm}-${dd}`;
// }
//Date formating function
export function dateFormating(dateString: string) {
   const date = new Date(dateString);
   return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      // month: "numeric",

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
