import { Response } from "express";

interface Pagination {
  page: number;
  limit: number;
  total: number;
}

interface ResponseOptions {
  message?: string;
  statusCode?: number;
  pagination?: Pagination;
}

export const sendSuccess = (
  res: Response,
  data: any,
  options: ResponseOptions = {},
) => {
  const { message, statusCode = 200, pagination } = options;
  return res.status(statusCode).json({
    status: "success",
    ...(message && { message }),

    ...(pagination && {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      // totalPages: Math.ceil(pagination.total / pagination.limit),
      // hasNextPage: pagination.page < Math.ceil(pagination.total / pagination.limit),
      // hasPrevPage: pagination.page > 1,
    }),
    data,
  });
};
