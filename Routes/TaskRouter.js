import express from 'express'
import TaskController from './../Conrollers/TasksController.js';

const TaskRouter = express.Router();

TaskRouter.get("/",TaskController.getlist);
TaskRouter.get("/:id",TaskController.getById);
TaskRouter.post("/",TaskController.add);
TaskRouter.put("/:id",TaskController.update);
TaskRouter.delete("/:id",TaskController.delete);

export default TaskRouter;