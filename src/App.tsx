import { useState } from "react";
import { TaskFilter } from "./components/TaskFilter/TaskFilter";
import { TaskItem } from "./components/TaskList/TaskItem";
import "./App.css";
import { TaskForm } from "./components/TaskForm/TaskForm";

function App() {
   const [count, setCount] = useState(0);

   const sampleTask = {
      id: 1,
      title: "Test Task",
      status: "pending",
      priority: "high",
   };

   return (
      <>
         return (
         <>
            <TaskFilter
               filters={{ status: "all", priority: "all", search: "" }}
               onChangeFilters={(f) => console.log(f)}
            />

            <TaskItem
               task={sampleTask}
               onStatusChange={(id, s) => console.log(id, s)}
               onDelete={(id) => console.log(id)}
            />

            <TaskForm task={sampleTask} onAddTask={onAddTask(formData)} />
         </>
         );
      </>
   );
}

export default App;
