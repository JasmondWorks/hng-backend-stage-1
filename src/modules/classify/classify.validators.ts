import { query } from "express-validator";

export const classifyNameValidator = [
  query("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .custom((value) => {
      if (typeof value !== "string") {
        throw new Error("Name must be a string");
      }
      return true;
    })
    .bail()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .bail()
    .matches(/^[A-Za-z\s\-']+$/)
    .withMessage("Name must be a valid string without numbers or invalid characters"),
];
