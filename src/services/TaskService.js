import BadRequestError from "../errors/BadRequestError.js";

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

  createTask = (email, taskPostedData) => {
    // Checar se o title já está sendo usado
    const validatedPostedTaskData = {};

    if (
      taskPostedData.title &&
      taskPostedData.title.length >= 3 &&
      taskPostedData.title.length <= 100
    ) {
      validatedPostedTaskData.title = taskPostedData.title;
    } else {
      throw new BadRequestError("Título não enviado ou inválido");
    }

    if (taskPostedData.description && taskPostedData.description.length >= 10) {
      validatedPostedTaskData.description = taskPostedData.description;
    } else {
      throw new BadRequestError("Descrição não enviada ou inválida");
    }

    validatedPostedTaskData.status = taskPostedData.status;
    validatedPostedTaskData.owner = email;

    try {
      return this.taskRepository.saveTask(validatedPostedTaskData);
    } catch (err) {
      throw err;
    }
  };

  updateTask = (title, updateTaskData) => {
    if (!updateTaskData.description && updateTaskData.status) {
      throw new BadRequestError("Nenhum campo que possa receber foi enviado");
    }

    const validatedUpdateTaskData = {};

    if (updateTaskData.description && updateTaskData.description.length >= 10) {
      validatedUpdateTaskData.description = updateTaskData.description;
    }

    if (updateTaskData.status) {
      validatedUpdateTaskData.status = updateTaskData.status;
    }

    try {
      const updatedTask = this.taskRepository.updateTask(
        title,
        validatedUpdateTaskData
      );
      return updatedTask;
    } catch (err) {
      throw err;
    }
  };

  deleteTask = (title) => {
    try {
      this.taskRepository.deleteTask(title);
      return;
    } catch (err) {
      throw err;
    }
  };
}

export default TaskService;
