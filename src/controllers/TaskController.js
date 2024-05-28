class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  create = (request, response) => {
    const taskPostedData = request.body;
    const user = JSON.parse(request.headers.user);
    console.log(user.email);

    const task = this.taskService.create(taskPostedData, user.email);

    return response.status(201).json(task);
  };
}

export default TaskController;
