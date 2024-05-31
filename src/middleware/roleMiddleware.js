import jwt from "jsonwebtoken";

import AccessDeniedError from "../errors/AccessDeniedError.js";

const key = "1";

function roleMiddleware(request, response, next) {
  const token = request.headers.token;

  if (!token) {
    throw new AccessDeniedError("Token não foi enviado");
  }

  // Verificar o token
  const tokenValido = jwt.verify(token, key);

  if (tokenValido) {
    // Autorização via role
    if (tokenValido.roles && tokenValido.roles.includes("admin")) {
      console.log("Autorização de admin");
      next();
    } else if (tokenValido.email === request.params.email) {
      // Se o email do user no token for igual ao email no path da URL
      console.log("Autorização por ser os recursos do próprio user");
      next();
    } else {
      throw new AccessDeniedError(
        "User não possui autorização para acessar o recurso"
      );
    }
  }
}

export default roleMiddleware;
