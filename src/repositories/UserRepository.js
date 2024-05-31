import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

import BadRequestError from "../errors/BadRequestError.js";

class UserRepository {
  findUsers = () => {
    const filePath = "dados/users.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        throw new Error("Nenhum usuário cadastrado");
      }

      const users = JSON.parse(fileData);

      return users;
    } catch (err) {
      throw err;
    }
  };

  saveUser = (userData) => {
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
      console.log("User criado");
      return userData;
    } catch (err) {
      throw err;
    }
  };

  updateUser = (email, changeUserData) => {
    const filePath = "dados/users.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        throw new Error("Nenhum usuário cadastrado");
      }

      let users = JSON.parse(fileData);
      let userFound = false;

      users = users.map((user) => {
        if (user.email === email) {
          userFound = true;
          return { ...user, ...changeUserData };
        }
        return user;
      });

      if (!userFound) {
        throw new BadRequestError("Usuário não encontrado");
      }

      writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

      return users.find((user) => user.email === email);
    } catch (err) {
      throw err;
    }
  };

  deleteUser = (email) => {
    const filePath = "dados/users.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        throw new BadRequestError("Nenhum usuário cadastrado");
      }

      let users = JSON.parse(fileData);
      const initialLength = users.length;

      // Filtra os users para remover aquele com o email especificado
      users = users.filter((user) => user.email !== email);

      // Verifica se algum user foi removido
      if (users.length === initialLength) {
        throw new Error("Usuário não encontrado");
      }

      // Escreve a lista de users atualizada de volta no arquivo
      writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

      return;
    } catch (err) {
      throw err;
    }
  };

  findUserByEmail = (email) => {
    const filePath = "dados/users.json";

    try {
      const fileData = readFileSync(filePath, "utf-8");
      if (!fileData) {
        throw new Error("Nenhum usuário cadastrado");
      }

      const users = JSON.parse(fileData);
      const user = users.find((user) => user.email === email);

      return user;
    } catch (err) {
      throw err;
    }
  };
}

export default UserRepository;
