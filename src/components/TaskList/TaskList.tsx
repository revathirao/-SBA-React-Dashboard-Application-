import type { TaskListProps } from "../../types";
import { TaskItem } from "../TaskList/TaskItem";

/**
 * TaskList Component
 ** This is a functional React component responsible for displaying a list of tasks.
 * It acts as a container that maps over an array of task data and renders a 'TaskItem'
 * component for each entry.
 ** Functionality Summary:
 * Accepts 'tasks' array, 'onStatusChange' callback, and 'onDelete' callback via props.
 * Conditionally renders a message ("No tasks available.") if the task list is empty.
 * If tasks exist, it renders an unordered list ('<ul>').
 * It uses the `.map()` function to iterate through the tasks array.
 * It passes individual task data and interaction handlers down to the child 'TaskItem' components.
 */
export function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
   return (
      <div>
         {tasks.length === 0 ? ( // Check if the 'tasks' array is empty.
            <p> No tasks available.</p>
         ) : (
            //Else render the list structure
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
               {/*
                * Map over the 'tasks' array to render a 'TaskItem' for each task.
                * Key Prop: 'key={task.id}' is essential for React to efficiently
                *  identify, update, and manage list elements.
                * Props Passing: Passes the individual 'task' object and the callback
                *   functions down to the child 'TaskItem' component.
                */}
               {tasks.map((task) => (
                  <TaskItem
                     key={task.id}
                     task={task}
                     onStatusChange={onStatusChange}
                     onDelete={onDelete}
                  />
               ))}
            </ul>
         )}
      </div>
   );
}
