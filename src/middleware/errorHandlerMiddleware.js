import AccessDeniedError from "../errors/AccessDeniedError.js";
import BadRequestError from "../errors/BadRequestError.js";

function errorMiddleware(err, request, response, next) {
  console.error(err);

  if (reconhecerError(err)) {
    return response.status(err.code).json({
      type: err.type,
      code: err.code,
      message: err.message,
    });
  }

  const error = {
    code: 500,
    type: "Internal Error",
    message: err.message,
  };

  return response.status(500).json(error);
}

function reconhecerError(error) {
  if (error instanceof BadRequestError) {
    return true;
  }

  if (error instanceof AccessDeniedError) {
    return true;
  }

  return false;
}

export default errorMiddleware;
