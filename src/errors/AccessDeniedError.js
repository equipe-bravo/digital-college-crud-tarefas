class AccessDeniedError extends Error {
  constructor(message) {
    super(message);

    this.type = "Access Denied";
    this.code = 401;
  }
}

export default AccessDeniedError;
