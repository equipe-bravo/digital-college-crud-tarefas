class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  listAll = () => {
    const usersList = this.userRepository.findAll();

    return usersList;
  };

  findOneByEmail = (email) => {
    const storedUser = this.userRepository.findOneByEmail(email);

    return storedUser;
  };

  createUser = (postedData) => {
    const { username, email, password } = postedData;
    // TODO:
    // regra de email único

    if (password.length < 6) {
      return { msg: "senha deve ter no mínimo 6 caracteres" };
    }

    const validatedUserData = {
      username: username,
      email: email,
      password: password,
      roles: ["user"],
    };

    const newUser = this.userRepository.save(validatedUserData);

    return newUser;
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
