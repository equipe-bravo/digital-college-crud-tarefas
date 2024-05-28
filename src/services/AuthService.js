import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  authenticate = (email, password) => {
    const storedUser = this.userRepository.findOneByEmail(email);
    if (!storedUser) {
      console.log("email not found");
      return { payload: "", token: "" };
    }

    // check password
    if (bcryptjs.compareSync(password, storedUser.password)) {
      const payload = {
        email: storedUser.email,
        roles: storedUser.roles,
        exp: Math.floor(Date.now() / 1000) + 60 * 30, // token expira em 30 minutos
      };

      const chaveSecreta = "1";

      // create token
      const token = jwt.sign(payload, chaveSecreta);
      console.log("new token created");

      return { payload: payload, token: token };
    } else {
      console.log("password incorreta");
      return { payload: "", token: "" };
    }
  };
}

export default AuthService;
