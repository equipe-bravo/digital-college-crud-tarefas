class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  listTasks = () => {
    try {
      return this.taskRepository.findTasks();
    } catch (err) {
      throw err;
    }
  };

  createTask = (taskPostedData, userEmail) => {
    const task = {
      title: taskPostedData.title,
      description: taskPostedData.description,
      status: taskPostedData.status,
      owner: userEmail,
    };

    return this.taskRepository.saveTask(task);
  };
}

export default TaskService;
