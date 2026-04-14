import { Request, Response } from "express";
import { ClassifyService } from "./classify.service";
import { sendSuccess } from "src/utils/api-response.util";
import { AppError } from "@/utils/app-error.util";
import { ClassifyQueryDTO } from "./classify.dtos";
import { getQuery } from "@/utils/get-query.util";

export class ClassifyController {
  constructor(private classifyService: ClassifyService) {}

  async classifyName(req: Request, res: Response) {
    try {
      const name = getQuery<ClassifyQueryDTO>(req.query);

      const result = await this.classifyService.classifyName(name.name);

      if (result.gender === null || result.sample_size === 0)
        throw new AppError(
          "No prediction available for the provided name",
          404,
        );

      sendSuccess(res, result);
    } catch (error) {
      throw error;
    }
  }
}
