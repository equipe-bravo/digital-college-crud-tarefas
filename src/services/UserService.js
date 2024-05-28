import bcryptjs from "bcryptjs";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  listAll = () => {
    const usersList = this.userRepository.findAll();

    return usersList;
  };

  findOneByEmail = (email) => {
    try {
      const storedUser = this.userRepository.findOneByEmail(email);

      if (!storedUser) {
        throw new Error("Usuário não encontrado");
      }

      return storedUser;
    } catch (error) {
      return { msg: error.message };
    }
  };

  createUser = (postedData) => {
    const { username, email, password } = postedData;

    try {
      // Regra de email único
      const storedUser = this.userRepository.findOneByEmail(email);
      if (storedUser) {
        throw new Error("O email enviado já está em uso");
      }

      // Verificação de comprimento da senha
      if (password.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres");
      }

      // Criptografia da senha
      const hashPassword = bcryptjs.hashSync(password, 1);

      const validatedUserData = {
        username: username,
        email: email,
        password: hashPassword,
        roles: ["user"],
      };

      // Salvar novo usuário
      const newUser = this.userRepository.save(validatedUserData);

      return newUser;
    } catch (error) {
      // Lidar com qualquer erro
      return { msg: error.message };
    }
  };

  updateUser = (changeData, emailParam) => {
    // encontrar storedUser buscando por email
    // conferir se os valores de changeData estão em branco
    // conferir se há um valor de changeData diferente de um valor de storedUser
    // salvar os valores trocados e não trocados em uma variável
    // deletar os antigos do user
    // salvar os novos valores no arquivo JSON
  };
}

export default UserService;
