class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

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
    };

    const newUser = this.userRepository.save(validatedUserData);

    return newUser;
  };
}

export default UserService;
