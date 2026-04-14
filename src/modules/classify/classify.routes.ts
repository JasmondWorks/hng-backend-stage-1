import { Router } from "express";
import { ClassifyController } from "./classify.controller";
import { ClassifyService } from "./classify.service";
import { envConfig } from "../../config/env.config";
import { validateRequest } from "../../middlewares/validate-request.middleware";
import { classifyNameValidator } from "./classify.validators";

const router = Router();

const classifyController = new ClassifyController(
  new ClassifyService(envConfig.genderizeApiUrl),
);

router.get(
  "/",
  classifyNameValidator,
  validateRequest,
  classifyController.classifyName.bind(classifyController),
);

export default router;
