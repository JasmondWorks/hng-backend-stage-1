import { validationResult } from "express-validator";
import { AppError } from "../utils/app-error.util";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((e) => e.msg)
      .join(", ");
    return next(new AppError(messages, 400));
  }

  next();
};
