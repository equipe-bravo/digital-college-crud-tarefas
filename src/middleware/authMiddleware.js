import jwt from "jsonwebtoken";

import AccessDeniedError from "../errors/AccessDeniedError.js";

const key = "1";

function authMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      throw new AccessDeniedError("Token não enviado");
    }

    jwt.verify(token, key);

    next();
  } catch (err) {
    // console.log(err);
    if (err.name === "JsonWebTokenError") {
      throw new AccessDeniedError("Não autorizado por falha na autenticação");
    } else {
      throw err;
    }
  }
}

export default authMiddleware;
