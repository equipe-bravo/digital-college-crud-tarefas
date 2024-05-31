import jwt from "jsonwebtoken";

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  listTasks = (request, response) => {
    try {
      return response.status(200).json(this.taskService.listTasks());
    } catch (err) {
      throw err;
    }
  };

  createTask = (request, response) => {
    try {
      const taskPostedData = request.body;
      const { email } = jwt.decode(request.headers.token);

      const task = this.taskService.createTask(taskPostedData, email);

      return response.status(201).json(task);
    } catch (err) {
      throw err;
    }
  };

  updateTask = (request, response) => {
    // TODO
  };

  deleteTask = (request, response) => {
    // TODO
  };
}

export default TaskController;
