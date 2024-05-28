class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  listTasks = (reques, response) => {
    // TODO
  };

  createTask = (request, response) => {
    const taskPostedData = request.body;
    const user = JSON.parse(request.headers.user);

    const task = this.taskService.createTask(taskPostedData, user.email);

    return response.status(201).json(task);
  };

  updateTask = (reques, response) => {
    // TODO
  };

  deleteTask = (reques, response) => {
    // TODO
  };
}

export default TaskController;
