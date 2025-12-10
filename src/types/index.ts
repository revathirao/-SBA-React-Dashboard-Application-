export type TaskStatus = "pending" | "in-progress" | "completed";
export type Priority = "low" | "medium" | "high";
export type Theme = "light" | "dark";

//task
export interface Task {
   id: string;
   title: string;
   description: string;
   status: TaskStatus;
   priority: Priority;
   dueDate: string;
   createdAt: string;
}

//formData
export interface TaskFormData {
   stitle: string;
   description: string;
   priority: Priority;
   dueDate: string;
}

export interface TaskFilterOptions {
   status: TaskStatus;
   priority: Priority;
   search: string;
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
}

//TaskItem Props
export interface TaskItemProps {
   task: Task; // the task to render
   onStatusChange: (taskId: string, newStatus: TaskStatus) => void; // mark status like complete, pending or inprogress
   onDelete: (taskId: string) => void; // delete handler
}

//Form props
export interface TaskFormProps {
   onAddTask: (data: TaskFormData) => void; // add new task
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
