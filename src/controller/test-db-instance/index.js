import Controller from "../controller.js";
import { Schema } from "./schema.js";

const Get = (req, res) => {
  return res.status(200).json({ body: "Success" });
};

const Post = async (req, res) => {
  const response = await res.sendDBCommand(req.body);
  return res.json(response);
};

export const testDB = new Controller({
  Path: "/test",
  Schema,
  Get,
  Post,
});
