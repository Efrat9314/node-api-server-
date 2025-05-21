import express from 'express';
import TaskController from '../Conrollers/TasksController.js'

const TaskRouter = express.Router();

TaskRouter.get("/", TaskController.getAll);
TaskRouter.get("/:id", TaskController.getById);
TaskRouter.post("/", TaskController.create);
TaskRouter.put("/:id", TaskController.update);
TaskRouter.delete("/:id", TaskController.delete);

export default TaskRouter;
