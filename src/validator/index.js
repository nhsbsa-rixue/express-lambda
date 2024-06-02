import { validationResult } from "express-validator";

const validator = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors && errors.length > 0) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      timestamp: new Date().toISOString(),
      fieldErrors: errors.map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

export { validator };
