import setUpController from "../controller/index.js";
import setUpDbInstance from "./dbInstance.js";
import setupParser from "./setupParser.js";
/**
 * 1. Configure to load heavy sync tasks once
 * 2. Register router here so handler can reuse those task
 *
 * @param {ExpressApp} app
 *
 */
export default (app) => {
  setUpDbInstance(app);
  setupParser(app);
  setUpController(app);
};
