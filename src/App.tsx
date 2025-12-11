import { useState } from "react";
import { TaskFilter } from "./components/TaskFilter/TaskFilter";
import { TaskItem } from "./components/TaskList/TaskItem";
import "./App.css";

function App() {
   const [count, setCount] = useState(0);

   return (
      <>
         return (
         <>
            <TaskFilter
               filters={{ status: "all", priority: "all", search: "" }}
               onChangeFilters={(f) => console.log(f)}
            />

            <TaskItem
               task={{ id: 1, title: "Sample Task", status: "completed" }}
               onStatusChange={(id, s) => console.log(id, s)}
               onDelete={(id) => console.log(id)}
            />
         </>
         );
      </>
   );
}

export default App;
