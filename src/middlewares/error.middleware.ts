import { NextFunction, Request, Response } from "express";
import { envConfig } from "../config/env.config";

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (envConfig.env === "development") {
    // Dev: full error + stack trace
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    // Prod: safe message for operational errors, generic for unknown

    if (err.isOperational) {
      res
        .status(err.statusCode)
        .json({ status: err.status, message: err.message });
    } else {
      console.error("ERROR 💥", err);
      res
        .status(500)
        .json({ status: "error", message: "Something went very wrong!" });
    }
  }
};
