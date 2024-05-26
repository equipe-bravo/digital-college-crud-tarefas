import { Router } from "express";

import TaskRepostitory from "../repositories/TaskRepository.js";
import TaskController from "../controllers/TaskController.js";
import TaskService from "../services/TaskService.js";

const taskRoutes = Router();

const taskRepository = new TaskRepostitory();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

taskRoutes.post("", taskController.create);

export default taskRoutes;
