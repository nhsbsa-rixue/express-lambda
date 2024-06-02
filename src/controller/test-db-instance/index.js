import Controller from "../controller.js";
import { Schema } from "./schema.js";

const Get = (req, res) => {
  const { plus, getCount } = req.task;
  plus();

  return res.json({ hello: "world", count: getCount() });
};

const Post = (req, res) => {
  return res.json({
    status: "Success",
    statusCode: 200,
    message: "Data received",
  });
};

export const testDB = new Controller({
  Path: "/test",
  Schema,
  Get,
  Post,
});
