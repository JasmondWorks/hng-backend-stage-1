import { Request, Response } from "express";
import { ClassifyService } from "./classify.service";
import { sendSuccess } from "../../utils/api-response.util";
import { AppError } from "../../utils/app-error.util";
import { ClassifyQueryDTO } from "./classify.dtos";

export class ClassifyController {
  constructor(private classifyService: ClassifyService) {}

  async classifyName(req: Request, res: Response) {
    try {
      const data = req.query as unknown as ClassifyQueryDTO;

      const result = await this.classifyService.classifyName(data);

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
