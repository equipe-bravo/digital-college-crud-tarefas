class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  listAll = (request, response) => {
    const usersList = this.userService.listAll();

    return response.status(200).json(usersList);
  };

  findOneByEmail = (request, response) => {
    const email = request.params.email;
    const storedUser = this.userService.findOneByEmail(email);

    return response.status(200).json(storedUser);
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
}

export default UserController;
