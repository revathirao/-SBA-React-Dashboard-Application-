import type { TaskItemProps } from "../../types";
import { dateFormating } from "../../utils/taskUtils";

/*
 * Define the 'TaskItem' functional component using destructuring for its props.
 * It accepts 'task' details, and two handler functions: 'onStatusChange' and 'onDelete'.
 * This component represents a single item in a task list UI.
 */
export function TaskItem({
   task,
   onStatusChange,
   onDelete,
   onEditTask,
}: TaskItemProps) {
   /*
    * 'handleStatusSelect' is an event handler for the dropdown menu (select element).
    * It is triggered when the user changes the status of a task.
    ** Line1: Get the new status value from the event object (e.target.value).
    *        'as typeof task.status' is a TypeScript assertion. It ensures that
    *        the value from the dropdown ("pending", "in-progress", or "completed")
    *        conforms to the specific literal string union type defined for 'task.status'.
    ** Line2: Call the 'onStatusChange' callback function provided by the parent component.
    *        It passes the current task's unique ID and the newly selected status
    *        up to the parent component, allowing the parent to manage the application state.
    */
   const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newStatus = e.target.value as typeof task.status; // ensure TypeScript knows the type
      onStatusChange(task.id, newStatus); // call parent handler
   };

   /*
    * 'handleDelete' is an event handler for the delete button.
    * It calls the 'onDelete' callback function provided by the parent component,
    * passing the current task's ID to signal which task should be removed from the list.
    */
   const handleDelete = () => {
      onDelete(task.id);
   };

   /*
    * The component renders a list item (li) for the task.
    * It displays the task title in an h3 tag.
    ** A 'select' element allows users to change the status, with its value controlled by 'task.status'.
    * The 'onChange' event is bound to 'handleStatusSelect'.
    * Each 'option' represents a possible status choice.
    ** A 'button' element is provided for deletion, with the 'onClick' event bound to 'handleDelete'.
    */
   return (
      <li className="task-item">
         <h3> {task.title}</h3>
         {/* PRIORITY*/}
         <span className={`priority-badge ${task.priority}`}>
            {task.priority.toUpperCase()}
         </span>
         {/* Dropdown to change task status */}
         <select value={task.status} onChange={handleStatusSelect}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
         </select>
         <button className="delete-btn" onClick={handleDelete}>
            Delete
         </button>
         <button className="edit-btn" onClick={() => onEditTask(task)}>
            Edit
         </button>
         <p>Due: {dateFormating(task.dueDate)}</p>
      </li>
   );
}
