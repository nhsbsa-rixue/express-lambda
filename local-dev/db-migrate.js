import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  CreateTableCommand,
} from "@aws-sdk/lib-dynamodb";
import logger from "@codegenie/serverless-express/src/logger";

const region = "eu-west-2"; // Update this to your desired region
const endpoint = "http://localhost:8002"; // Update this to your DynamoDB endpoint

const dbclient = new DynamoDBClient({ region, endpoint });
const ddbDocClient = DynamoDBDocumentClient.from(dbclient);

async function createTable() {
  const params = {
    TableName: "notes",
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
    const data = await ddbDocClient.send(new CreateTableCommand(params));
    logger.info("Table Created", data);
  } catch (err) {
    logger.error(err);
  }
}

createTable();
