import jwt from "jsonwebtoken";

const key = "1";

function authMiddleware(request, response, next) {
  try {
    const token = request.headers.token;
    // TODO
    // return response quando não houver token
    if (!token) {
      return response.status(400).json({ msg: "Token não enviado" });
    }

    const tokenValido = jwt.verify(token, key);

    if (token && tokenValido) {
      next();
    }

    return response.status(400).json({ msg: "token inválido" });
  } catch {
    return response.status(401).json({ msg: "não autorizado" });
  }
}

export default authMiddleware;
