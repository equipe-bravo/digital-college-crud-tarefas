import jwt from "jsonwebtoken";

class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  listTasks = (request, response) => {
    // TODO
  };

  createTask = (request, response) => {
    const taskPostedData = request.body;

    const { email } = jwt.decode(request.headers.token);

    const task = this.taskService.createTask(taskPostedData, email);

    return response.status(201).json(task);
  };

  updateTask = (request, response) => {
    // TODO
  };

  deleteTask = (request, response) => {
    // TODO
  };
}

export default TaskController;
