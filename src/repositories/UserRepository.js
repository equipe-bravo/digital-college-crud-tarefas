import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

class UserRepository {
  save = (userData) => {
    let fileData = [];
    const filePath = "dados/users.json";

    try {
      const dirPath = dirname(filePath);
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }

      if (existsSync(filePath)) {
        const existingData = readFileSync(filePath, "utf-8");
        fileData = existingData ? JSON.parse(existingData) : [];
      }

      fileData.push(userData);

      writeFileSync(filePath, JSON.stringify(fileData, null, 2), "utf-8");
    } catch (error) {
      console.log(error);
      return { msg: "erro no servidor" };
    }

    return userData;
  };
}

export default UserRepository;
