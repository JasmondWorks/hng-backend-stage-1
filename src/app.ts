import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express, { NextFunction, Request, Response } from "express";

import v1Routes from "./routes/v1.route";

import { globalErrorHandler } from "./middlewares/error.middleware";

import { AppError } from "./utils/app-error.util";

const app = express();

app.use(express.json());

// Middleware to inject processed_at
app.use((req: Request, _: Response, next: NextFunction) => {
  (req as any).processed_at = new Date().toISOString(); // UTC ISO 8601
  next();
});

app.use("/api", v1Routes);

// 404 catch-all

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler (must be last middleware)

app.use(globalErrorHandler);

export default app;
