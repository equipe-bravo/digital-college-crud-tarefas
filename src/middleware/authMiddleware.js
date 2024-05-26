import jwt from "jsonwebtoken";

const key = "1";

function authMiddleware(request, response, next) {
  try {
    const token = request.headers.token;
    // TODO
    // return response quando não houver token

    const tokenValido = jwt.verify(token, key);

    if (token && tokenValido) {
      next();
    }
  } catch {
    return response.status(401);
  }
}

export default authMiddleware;
