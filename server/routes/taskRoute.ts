import { Router } from "express";
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/taskControllers";
import validateTaskAttributes from "../middlewares/taskMiddleware";

const router = Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", validateTaskAttributes, createTask);
router.put("/tasks/:id", validateTaskAttributes, updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
