import { query } from "express-validator";

export const classifyNameValidator = [
  query("name")
    .notEmpty()
    .isString()
    .withMessage("Name is required")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters"),
];
