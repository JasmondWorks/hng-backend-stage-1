import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: any,
  _message?: string, // Kept for backwards compatibility but not used in the strict response
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    status: "success",
    data,
  });
};
