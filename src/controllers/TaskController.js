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
    const taskPostedData = {
      title: request.body.title,
      description: request.body.description,
      status: "",
    };
    try {
      const { email } = jwt.decode(request.headers.token);

      const task = this.taskService.createTask(email, taskPostedData);

      return response.status(201).json(task);
    } catch (err) {
      throw err;
    }
  };

  updateTask = (request, response) => {
    const title = request.params.title;
    const updateTaskData = {
      description: request.body.description,
      status: request.body.status,
    };

    try {
      const updatedTask = this.taskService.updateTask(title, updateTaskData);
      return response.status(200).json(updatedTask);
    } catch (err) {
      throw err;
    }
  };

  deleteTask = (request, response) => {
    const title = request.params.title;

    try {
      this.taskService.deleteTask(title);
      return response.status(204).json();
    } catch (err) {
      throw err;
    }
  };
}

export default TaskController;
