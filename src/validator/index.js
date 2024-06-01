import * as schemas from "./schemas/index.js";
import { validationResult } from "express-validator";

const validator = (req, res, next) => {
  const { errors } = validationResult(req);

  if (errors && errors.length > 0) {
    return res.status(400).json(errors);
  }

  next();
};

export { validator, schemas };
