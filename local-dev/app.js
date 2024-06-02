import express from "express";
import setup from "../src/setup/index.js";
import logger from "../src/logger/index.js";
import config from "../src/config/index.js";

const { PORT, APP_NAME } = config;
const app = express();
setup(app);

app.listen(PORT, () => {
  logger.info(`${APP_NAME} listening at http://localhost:${PORT}`);
});

export default app;
