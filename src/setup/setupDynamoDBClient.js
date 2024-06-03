import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
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

  async getItem(partMonth) {
    return this.sendCommand(
      new QueryCommand({
        TableName: config.DYNAMODB_TABLE_NAME,
        KeyConditionExpression: "odsCode = :odsCode and partMonth = :partMonth",
        ExpressionAttributeValues: {
          ":odsCode": "FAAAA",
          ":partMonth": partMonth,
        },
      }),
    );
  }

  async createItem(item) {
    return this.sendCommand(
      new PutCommand({
        TableName: config.DYNAMODB_TABLE_NAME,
        Item: {
          ...item,
        },
      }),
    );
  }

  async listItems() {
    return this.sendCommand(
      new ScanCommand({
        TableName: config.DYNAMODB_TABLE_NAME,
        FilterExpression: "odsCode = :odsCode",
        ExpressionAttributeValues: {
          ":odsCode": "FAAAA",
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
          body: data.Items,
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
