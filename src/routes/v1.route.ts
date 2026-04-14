import express, { Response } from "express";

const router = express.Router();

import classifyRoutes from "../modules/classify/classify.routes";

// Health check
router.get("/health", (_, res) => {
  res.status(200).json({ ok: true, message: "HNG Backend API is running" });
});

// Mount modules
router.use("/classify", classifyRoutes);

export default router;
