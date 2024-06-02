import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger/index.js";
import config from "../config/index.js";

const dbclient = new DynamoDBClient({
  region: config.AWS_REGION,
  endpoint: config.DYNAMODB_ENDPOINT,
});
const ddbClient = DynamoDBDocumentClient.from(dbclient);

export class dynamoDB {
  constructor(dynamoDBClient) {
    this.dynamoDBClient = dynamoDBClient;
  }

  async getItem(id) {
    return this.sendCommand(
      new GetCommand({
        TableName: config.DYNAMODB_TABLE_NAME,
        Key: {
          id,
        },
      }),
    );
  }

  async createItem(item) {
    return this.sendCommand(
      new PutCommand({
        TableName: config.DYNAMODB_TABLE_NAME,
        Item: {
          id: uuidv4(),
          sortKey: "test",
          ...item,
        },
      }),
    );
  }

  async listItems() {
    return this.sendCommand(
      new ScanCommand({
        TableName: config.DYNAMODB_TABLE_NAME,
        FilterExpression: "#year > :yr",
        ExpressionAttributeNames: {
          "#year": "year",
        },
        ExpressionAttributeValues: {
          ":yr": 1999,
        },
      }),
    );
  }

  async sendCommand(command) {
    try {
      const data = await this.dynamoDBClient.send(command);
      if (data) {
        return {
          statusCode: 200,
          body: data,
        };
      }
    } catch (error) {
      logger.error(error);
      return {
        statusCode: 500,
        body: "Internal Server Error",
      };
    }
  }
}

const setupDynamoDBClient = async (app) => {
  app.use((req, res, next) => {
    req.dynamoDBClient = new dynamoDB(ddbClient);
    next();
  });
};

export default setupDynamoDBClient;
