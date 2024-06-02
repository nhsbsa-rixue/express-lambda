import logger from "../logger/index.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err, err.message);

  res.status(500).json({
    message: "Internal Server Error",
    body: err.message,
  });
  next();
};

const setupErrorHandlers = (app) => {
  app.use(errorHandler);

  app.all("*", (_, res) => {
    return res.status(404).json({
      message: "Not Found",
      status: 404,
      body: "The requested resource was not found",
    });
  });
};

export default setupErrorHandlers;
