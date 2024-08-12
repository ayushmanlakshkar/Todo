import { Schema, model } from "mongoose";

// Define an interface for the Task document
interface ITask {
  priority: "Low" | "Medium" | "High"; // Task priority levels
  deadline: Date; // When the task needs to be completed
  title: string; // What the task is about
  description: string; // Details about the task
  status: "To Do" | "In Progress" | "Done" | "Timeout";
  createdAt: Date; // When the task was created
  hasTimedOut(): boolean; // Method to check if the task has timed out
}

// Define the schema for the Task model
const TaskSchema = new Schema<ITask>({
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TaskSchema.methods.hasTimedOut = function (): boolean {
  const now = Date.now();
  return this.deadline < now;
};

const Task = model<ITask>("Task", TaskSchema);
export default Task;
