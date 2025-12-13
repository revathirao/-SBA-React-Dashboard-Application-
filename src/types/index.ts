export type TaskStatus = "all" | "pending" | "in-progress" | "completed";
export type Priority = "all" | "low" | "medium" | "high";
export type Theme = "light" | "dark";

//task
export interface Task {
   id: string;
   title: string;
   description: string;
   status: TaskStatus;
   priority: Priority;
   dueDate: string;
}

//formData
export interface TaskFormData {
   title: string;
   description: string;
   priority: Priority;
   dueDate: string;
   status: TaskStatus;
}

export interface TaskFilterOptions {
   status: TaskStatus;
   priority: Priority;
   search: string;
   sortBy: "dueDate" | "priority" | "status" | "none";
}

//Taskfilter props
export interface TaskFilterProps {
   filters: TaskFilterOptions; // current filter values
   onChangeFilters: (filters: TaskFilterOptions) => void; // update filters
}

//TaskList
export interface TaskListProps {
   tasks: Task[]; // list of tasks
   onDelete: (id: string) => void; // delete handler
   onStatusChange: (taskId: string, newStatus: TaskStatus) => void; // mark status like complete, pending or inprogress
   onEditTask: (task: Task) => void;
}

//TaskItem Props
export interface TaskItemProps {
   task: Task; // the task to render
   onStatusChange: (taskId: string, newStatus: TaskStatus) => void; // mark status like complete, pending or inprogress
   onDelete: (taskId: string) => void; // delete handler
   onEditTask: (task: Task) => void;
}

//Form props
export interface TaskFormProps {
   task?: TaskFormData; // optional, pre-fill for editing
   onAddTask: (data: TaskFormData) => void;
   onEditTask: (data: TaskFormData) => void; // optional handler for edits
}

//DashBoard Props
export interface DashboardProps {
   tasks: Task[]; // list of tasks
   onAddTask: (data: TaskFormData) => void; // add new task
   onDelete: (id: string) => void; // delete handler
   onStatusChange: (taskId: string, newStatus: TaskStatus) => void; // mark status like complete, pending or inprogress
   theme: Theme;
   onToggleTheme: () => void;
}
