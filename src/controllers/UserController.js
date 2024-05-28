class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  listUsers = (request, response) => {
    const usersList = this.userService.listUsers();

    return response.status(200).json(usersList);
  };

  createUser = (request, response) => {
    const postedData = request.body;

    const newUser = this.userService.createUser(postedData);

    return response.status(201).json(newUser);
  };

  updateUser = (request, response) => {
    const emailParam = request.params.email;
    const changeData = request.body;

    const changedUser = this.userService.updateUser(changeData, emailParam);

    return response.status(200).json(changedUser);
  };

  deleteUser = (request, response) => {
    // TODO
  };

  findUserByEmail = (request, response) => {
    const email = request.params.email;
    const storedUser = this.userService.findUserByEmail(email);

    return response.status(200).json(storedUser);
  };
}

export default UserController;
