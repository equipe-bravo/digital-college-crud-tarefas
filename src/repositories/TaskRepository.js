import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

class TaskRepostitory {
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
}

export default TaskRepostitory;
