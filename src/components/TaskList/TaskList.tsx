import type { TaskListProps } from "../../types";
import { TaskItem } from "../TaskList./TaskItem";

export function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
   return (
      <div>
         {tasks.length === 0 ? (
            <p> No tasks available.</p>
         ) : (
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
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
