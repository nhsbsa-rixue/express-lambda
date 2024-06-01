import express from "express";
import serverlessExpress from "@codegenie/serverless-express";
import setupApp from "./setup/index.js";

let serverlessExpressInstance;

async function setup(event, context) {
  const app = express();
  setupApp(app);

  serverlessExpressInstance = serverlessExpress({ app });
  return serverlessExpressInstance(event, context);
}

export function handler(event, context) {
  if (serverlessExpressInstance)
    return serverlessExpressInstance(event, context);

  return setup(event, context);
}
