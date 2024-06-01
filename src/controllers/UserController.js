class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  listUsers = (request, response) => {
    try {
      const usersList = this.userService.listUsers();
      return response.status(200).json(usersList);
    } catch (err) {
      throw err;
    }
  };

  createUser = (request, response) => {
    try {
      const postedUserData = request.body;

      const newUser = this.userService.createUser(postedUserData);

      return response.status(201).json(newUser);
    } catch (err) {
      throw err;
    }
  };

  updateUser = (request, response) => {
    const email = request.params.email;
    const updateUserData = {
      username: request.body.username,
    };

    try {
      const updatedUser = this.userService.updateUser(email, updateUserData);
      return response.status(200).json(updatedUser);
    } catch (err) {
      throw err;
    }
  };

  deleteUser = (request, response) => {
    const email = request.params.email;

    try {
      this.userService.deleteUser(email);
      return response.status(204).json();
    } catch (err) {
      throw err;
    }
  };

  findUserByEmail = (request, response) => {
    const email = request.params.email;
    const storedUser = this.userService.findUserByEmail(email);

    return response.status(200).json(storedUser);
  };
}

export default UserController;
