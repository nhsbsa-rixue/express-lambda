import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import logger from "../logger/index.js";
import config from "../config/index.js";

const ddbClient = new DynamoDBClient({
  region: config.AWS_REGION,
  endpoint: config.DYNAMODB_ENDPOINT,
});
const dynamoDBClient = DynamoDBDocumentClient.from(ddbClient);

const sendDBCommand = async (body) => {
  try {
    await dynamoDBClient.send(
      new PutCommand({
        TableName: config.DYNAMODB_TABLE_NAME,
        Item: {
          id: Math.random().toString(36).substring(2),
          content: JSON.stringify(body),
        },
      }),
    );
  } catch (error) {
    logger.error(error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }

  return {
    statusCode: 200,
    body: "OK",
  };
};

const dbInstance = (req, res, next) => {
  req.dynamoDBClient = dynamoDBClient;
  res.sendDBCommand = sendDBCommand;
  next();
};

const setupDynamoDBClient = async (app) => {
  app.use(dbInstance);
};

export default setupDynamoDBClient;
