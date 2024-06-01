import express from "express";
import logger from "../logger/index.js";
import { validator, schemas } from "../validator/index.js";

const router = express.Router();

router.get("/test", (req, res) => {
  const { plus, getCount } = req.task;
  plus();

  return res.json({ hello: "world", count: getCount() });
});

router.get("/", (req, res) => {
  logger.info("GET /");

  return res.json({ message: "Hello, World!" });
});

router.post("/", schemas.DOB, validator, (req, res) => {
  return res.json({
    status: "success",
    statusCode: 200,
    message: "Data received",
  });
});

const setUpController = (app) => {
  app.use(router);
};

export default setUpController;
