import { body } from "express-validator";

const Schema = [
  body("partMonth")
    .trim()
    .notEmpty()
    .withMessage("partMonth is required.")
    .custom((value) => {
      const year = value.slice(0, 4);
      const month = value.slice(4, 6);
      if (
        /^\d{4}$/.test(year) &&
        /^\d{2}$/.test(month) &&
        month >= 1 &&
        month <= 12
      ) {
        return true;
      }
      throw new Error("Invalid date format. Expected format: YYYYMM");
    }),
  body("note").trim().notEmpty().withMessage("note is required."),
  body("odsCode").trim().notEmpty().withMessage("odsCode is required."),
];

export { Schema };
