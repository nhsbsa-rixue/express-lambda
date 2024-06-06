import Controller from "../Controller.js";
import { Schema } from "./schema.js";

const Get = async (req, res) => {
  const response = await req.dynamoDBClient.getItem(req.params.id);
  return res.status(200).json(response);
};

const List = async (req, res) => {
  const response = await req.dynamoDBClient.listItems();
  return res.status(200).json(response);
};

const Post = async (req, res) => {
  const response = await req.dynamoDBClient.createItem(req.body);
  return res.json(response);
};

export const testDB = new Controller({
  Path: "/test",
  Schema,
  Get,
  Post,
  List,
});
