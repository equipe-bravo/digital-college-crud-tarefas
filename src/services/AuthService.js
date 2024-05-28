import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  authenticate = (email, password) => {
    const storedUser = this.userRepository.findUserByEmail(email);
    if (!storedUser) {
      console.log("email not found");
      return { payload: "", token: "" };
    }

    if (bcryptjs.compareSync(password, storedUser.password)) {
      const payload = {
        email: storedUser.email,
        roles: storedUser.roles,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };

      const chaveSecreta = "1";

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
