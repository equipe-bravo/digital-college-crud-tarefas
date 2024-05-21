const axios = require('axios');

const BASE_URL = 'http://localhost:5000/tasks';

const createTask = async (taskData) => {
  const response = await axios.post(BASE_URL, taskData);
  return response.data;
};

const getTasks = async (userId) => {
  const response = await axios.get(`${BASE_URL}?userId=${userId}`);
  return response.data;
};

const getTaskById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

const updateTask = async (id, taskData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, taskData);
  return response.data;
};

const deleteTask = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
