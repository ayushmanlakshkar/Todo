export interface TaskModel {
    _id: string;
    priority: "High" | "Medium" | "Low"; // Assuming the priority has specific options
    deadline: string; // ISO string format
    title: string;
    description: string;
    status: "To Do" | "In Progress" | "Done"; // Assuming status has specific options
    createdAt: string; // ISO string format
    __v: number;
  }
  