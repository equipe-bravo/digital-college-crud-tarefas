class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  create = (request, response) => {
    const taskPostedData = request.body;

    const task = this.taskService.create(taskPostedData);

    return response.status(201).json(task);
  };
}

export default TaskController;
