import { Request, Response } from "express";
import { ClassifyService } from "./classify.service";
import { sendSuccess } from "src/utils/api-response.util";

export class ClassifyController {
  constructor(private classifyService: ClassifyService) {}

  async classifyName(req: Request, res: Response) {
    const name = req.query.name as string;

    const result = await this.classifyService.classifyName(name);

    sendSuccess(res, result);
  }
}
