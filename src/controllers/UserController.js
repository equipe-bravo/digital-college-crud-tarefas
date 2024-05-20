class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUser = (request, response) => {
    const postedData = request.body;

    const newUser = this.userService.createUser(postedData);

    return response.status(201).json(newUser);
  };
}

export default UserController;
