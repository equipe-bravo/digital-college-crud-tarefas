class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

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
