import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import config from "../src/config/index.js";
import logger from "../src/logger/index.js";

const dbclient = new DynamoDBClient({
  region: config.AWS_REGION,
  endpoint: config.DYNAMODB_ENDPOINT,
});
const ddbDocClient = DynamoDBDocumentClient.from(dbclient);

async function createTable() {
  const params = {
    TableName: config.DYNAMODB_TABLE_NAME,
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    // Try to describe the table
    await dbclient.send(
      new DescribeTableCommand({ TableName: config.DYNAMODB_TABLE_NAME }),
    );
    logger.info(
      `Table ${config.DYNAMODB_TABLE_NAME} already exists. Skipping creation.`,
    );
  } catch (error) {
    // If the table does not exist, create it
    logger.info(
      `Table ${config.DYNAMODB_TABLE_NAME} does not exist. Creating...`,
    );
    await dbclient.send(new CreateTableCommand(params));
    logger.info(`Table ${config.DYNAMODB_TABLE_NAME} created successfully.`);
  }
}

createTable();
