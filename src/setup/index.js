import setupParser from "./setupParser.js";
import setupController from "./setupController.js";
import setupDynamoDBClient from "./setupDynamoDBClient.js";
import setupErrorHandlers from "./errorHandler.js";

/**
 * 1. Configure to load heavy sync tasks once
 * 2. Register router here so handler can reuse those task
 *
 * @param {ExpressApp} app
 *
 */
export default (app) => {
  setupParser(app);
  setupDynamoDBClient(app);
  setupController(app);
  setupErrorHandlers(app);
};
