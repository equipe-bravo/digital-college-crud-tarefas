import jwt from "jsonwebtoken";

const key = "1";

function roleMiddleware(request, response, next) {
  try {
    // Ler o token do cabeçalho da requisição
    const token = request.headers.token;

    // Retornar resposta quando não houver token
    if (!token) {
      return response.status(400).json({ msg: "Token não enviado" });
    }

    // Verificar o token
    const tokenValido = jwt.verify(token, key);
    console.log(tokenValido);

    // Se o token for válido
    if (tokenValido) {
      // Se o token contiver o papel de administrador
      if (tokenValido.roles && tokenValido.roles.includes("admin")) {
        console.log("passou por admin");
        return next();
      }

      // Se o email do usuário no token for igual ao email do usuário na requisição
      if (tokenValido.email === request.params.email) {
        console.log("passou por id");
        return next();
      }
    }

    // Se nenhuma das condições acima for atendida, retornar resposta não autorizada
    return response.status(401).json({ msg: "Não autorizado" });
  } catch (error) {
    // Em caso de erro (ex.: token inválido ou expirado), retornar resposta não autorizada
    return response.status(401).json({ msg: "Não autorizado" });
  }
}

export default roleMiddleware;
