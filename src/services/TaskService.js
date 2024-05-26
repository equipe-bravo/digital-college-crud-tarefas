class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  create = (taskPostedData) => {
    return this.taskRepository.save(taskPostedData);
  };
}

export default TaskService;
