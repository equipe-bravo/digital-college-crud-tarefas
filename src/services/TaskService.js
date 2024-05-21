const TaskRepository = require('../repositories/TaskRepository');

const createTask = async (user, taskData) => {
  taskData.userId = user.id;
  return TaskRepository.createTask(taskData);
};

const getTasks = async (user) => {
  return TaskRepository.getTasks(user.id);
};

const updateTask = async (user, id, taskData) => {
  const task = await TaskRepository.getTaskById(id);
  if (task.userId !== user.id && user.role !== 'admin') {
    throw new Error('Not authorized');
  }
  return TaskRepository.updateTask(id, taskData);
};

const deleteTask = async (user, id) => {
  const task = await TaskRepository.getTaskById(id);
  if (task.userId !== user.id && user.role !== 'admin') {
    throw new Error('Not authorized');
  }
  return TaskRepository.deleteTask(id);
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
