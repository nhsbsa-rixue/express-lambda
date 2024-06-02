import express from "express";
import * as controllers from "../controller/index.js";
import { validator } from "../validator/index.js";

const router = express.Router();

const setupController = (app) => {
  Object.entries(controllers).forEach(([key, controller]) => {
    const { Path, Get, Post, Put, Delete, PutSchema, PostSchema } = controller;

    const controllerPath = Path || key;

    if (Get) {
      router.get(controllerPath, Get);
    }

    if (Post) {
      router.post(controllerPath, PostSchema, validator, Post);
    }
    if (Put) {
      router.put(controllerPath, PutSchema, validator, Put);
    }
    if (Delete) {
      router.delete(controllerPath, Delete);
    }
  });

  app.use(router);
};

export default setupController;
