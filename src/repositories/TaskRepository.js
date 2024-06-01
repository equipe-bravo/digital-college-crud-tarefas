import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

import BadRequestError from "../errors/BadRequestError.js";

class TaskRepostitory {
  findTasks = () => {
    const filePath = "dados/tasks.json";

    try {
      if (existsSync(filePath)) {
        const existingData = readFileSync(filePath, "utf-8");
        return existingData ? JSON.parse(existingData) : [];
      } else {
        return [];
      }
    } catch (err) {
      throw err;
    }
  };

  saveTask = (taskData) => {
    let fileData = [];
    const filePath = "dados/tasks.json";

    try {
      const dirPath = dirname(filePath);
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }

      if (existsSync(filePath)) {
        const existingData = readFileSync(filePath, "utf-8");
        fileData = existingData ? JSON.parse(existingData) : [];
      }

      fileData.push(taskData);

      writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");
    } catch (error) {
      console.log(error);
      return { msg: error.message };
    }

    return taskData;
  };

  updateTask = (title, changeTaskData) => {
    const filePath = "dados/tasks.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        throw new Error("Nenhum Tarefa cadastrado");
      }

      let tasks = JSON.parse(fileData);
      let taskFound = false;

      tasks = tasks.map((task) => {
        if (task.title === title) {
          taskFound = true;
          return { ...task, ...changeTaskData };
        }
        return task;
      });

      if (!taskFound) {
        throw new BadRequestError("Tarefa não encontrado");
      }

      writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");

      return tasks.find((task) => task.title === title);
    } catch (err) {
      throw err;
    }
  };

  deleteTask = (title) => {
    const filePath = "dados/tasks.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        throw new Error("Nenhuma tarefa cadastrada");
      }

      let tasks = JSON.parse(fileData);
      const initialLength = tasks.length;

      // Filtra as tarefas para remover aquela com o título especificado
      tasks = tasks.filter((task) => task.title !== title);

      // Verifica se alguma tarefa foi removida
      if (tasks.length === initialLength) {
        throw new BadRequestError("Tarefa não encontrada");
      }

      // Escreve a lista de tarefas atualizada de volta no arquivo
      writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");

      return;
    } catch (err) {
      throw err;
    }
  };
}

export default TaskRepostitory;
