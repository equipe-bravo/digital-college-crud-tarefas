import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

class UserRepository {
  findAll = () => {
    const filePath = "dados/users.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        return { msg: "Nenhum usuário cadastrado" };
      }

      const users = JSON.parse(fileData);

      return users;
    } catch (err) {
      console.log("Erro ao tentar ler o arquivo");
      return { msg: "Erro ao ler dados" };
    }
  };

  findOneByEmail = (email) => {
    const filePath = "dados/users.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        throw new Error("Nenhum usuário cadastrado");
      }

      const users = JSON.parse(fileData);
      const user = users.find((user) => user.email === email);

      if (user) {
        return user;
      }
    } catch (err) {
      console.log("Erro ao tentar ler o arquivo");
      throw new Error("Erro ao ler dados");
    }
    return;
  };

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
