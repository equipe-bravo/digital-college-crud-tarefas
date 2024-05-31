import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const chaveSecreta = "1";

const EXPIRATION_IN_SECONDS = 60 * 60 * 24; // 1 dia

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  authenticate = (email, password) => {
    const storedUser = this.userRepository.findUserByEmail(email);
    if (!storedUser) {
      return; // throw exception
    }

    if (bcryptjs.compareSync(password, storedUser.password)) {
      const payload = {
        email: storedUser.email,
        roles: storedUser.roles,
        exp: Math.floor(Date.now() / 1000) + EXPIRATION_IN_SECONDS,
      };

      const token = jwt.sign(payload, chaveSecreta);

      return token;
    } else {
      return; // throw exception
    }
  };
}

export default AuthService;
