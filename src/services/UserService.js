import bcryptjs from "bcryptjs";

import BadRequestError from "../errors/BadRequestError.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  listUsers = () => {
    const usersList = this.userRepository.findUsers();
    return usersList;
  };

  createUser = (postedData) => {
    const { username, email, password } = postedData;

    try {
      const storedUser = this.userRepository.findUserByEmail(email);
      if (storedUser) {
        throw new BadRequestError("O email enviado já está em uso");
      }

      if (password.length < 6) {
        throw new BadRequestError("A senha deve ter no mínimo 6 caracteres");
      }

      const hashPassword = bcryptjs.hashSync(password, 1);

      const validatedUserData = {
        username: username,
        email: email,
        password: hashPassword,
        roles: ["user"],
      };

      const newUser = this.userRepository.saveUser(validatedUserData);

      return newUser;
    } catch (err) {
      throw err;
    }
  };

  updateUser = (email, updateUserData) => {
    // Validar campos de updatedUserData (checar se os novos valores atendem as regras de negócio)

    try {
      const updatedUser = this.userRepository.updateUser(email, updateUserData);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  deleteUser = (email) => {
    try {
      return this.userRepository.deleteUser(email);
    } catch (err) {
      throw err;
    }
  };

  findUserByEmail = (email) => {
    try {
      const storedUser = this.userRepository.findUserByEmail(email);

      if (!storedUser) {
        throw new BadRequestError("Nenhum user com esse email foi encontrado");
      }

      return storedUser;
    } catch (err) {
      throw err;
    }
  };
}

export default UserService;
