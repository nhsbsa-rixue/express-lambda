import logger from "../logger/index.js";

const asyncTask = () => {
  logger.info("========asyncTask===============");

  let count = 0;
  const plus = () => {
    logger.info("========plus===============");
    count += 1;
  };

  const getCount = () => {
    return count;
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve({ plus, getCount }), 1000);
  });
};
const task = await asyncTask();

const dbInstance = (req, _res, next) => {
  req.task = task;
  next();
};

const setUpDbInstance = async (app) => {
  app.use(dbInstance);
};

export default setUpDbInstance;
