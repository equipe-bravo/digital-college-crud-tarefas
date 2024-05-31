class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  authenticate = (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.sendStatus(400);
    }

    const token = this.authService.authenticate(email, password);

    if (token) {
      return response.send({
        auth: token,
      });
    } else {
      return response.status(401).json({ error: "email/password incorretos" });
    }
  };
}

export default AuthController;
