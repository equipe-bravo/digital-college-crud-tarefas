class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  create = (taskPostedData, userEmail) => {
    const task = {
      title: taskPostedData.title,
      owner: userEmail,
    };
    console.log(task);

    return this.taskRepository.save(task);
  };
}

export default TaskService;
