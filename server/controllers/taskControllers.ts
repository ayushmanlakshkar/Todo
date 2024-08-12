import { Request, Response } from "express";
import Task from "../models/taskModel";

// Fetch all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
} catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { priority, deadline, title, description, status } = req.body;
    const task = new Task({ priority, deadline, title, description,status });
    await task.save();
    res.status(201).json(task);
} catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
} catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted" });
} catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
