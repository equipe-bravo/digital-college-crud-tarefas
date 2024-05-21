const TaskService = require('../services/TaskService');

const createTask = async (req, res, next) => {
  try {
    const task = await TaskService.createTask(req.user, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const tasks = await TaskService.getTasks(req.user);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await TaskService.updateTask(req.user, req.params.id, req.body);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await TaskService.deleteTask(req.user, req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
