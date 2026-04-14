import { Response } from "express";

export class ApiResponse {
  public readonly success: boolean;

  constructor(
    public readonly statusCode: number,

    public readonly data: any,

    public readonly message: string = "Success",
  ) {
    this.success = statusCode < 400;
  }
}

export const sendSuccess = (
  res: Response,
  data: any,
  message = "Success",
  statusCode = 200,
) => {
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, data, message));
};
