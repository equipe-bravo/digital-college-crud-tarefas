import bcryptjs from "bcryptjs";

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
        throw new Error("O email enviado já está em uso");
      }

      if (password.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres");
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
    } catch (error) {
      return { msg: error.message };
    }
  };

  updateUser = (changeData, emailParam) => {
    // TODO
  };

  deleteUser = (param) => {
    // TODO
  };

  findUserByEmail = (email) => {
    try {
      const storedUser = this.userRepository.findUserByEmail(email);

      if (!storedUser) {
        throw new Error("Usuário não encontrado");
      }

      return storedUser;
    } catch (error) {
      return { msg: error.message };
    }
  };
}

export default UserService;
