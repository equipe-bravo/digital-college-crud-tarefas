class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  listAll = (request, response) => {
    const usersList = this.userService.listAll();

    return response.status(200).json(usersList);
  };

  createUser = (request, response) => {
    const postedData = request.body;

    const newUser = this.userService.createUser(postedData);

    return response.status(201).json(newUser);
  };
}

export default UserController;
