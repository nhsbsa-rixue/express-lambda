import dotEnv from "dotenv";

dotEnv.config();

export default {
  APP_NAME: process.env.APP_NAME || "APP_NAME",
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8000,
  DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME || "notes",
  AWS_REGION: process.env.AWS_REGION || "eu-west-2",
  DYNAMODB_ENDPOINT: process.env.DYNAMODB_ENDPOINT || "http://localhost:8002",
};
