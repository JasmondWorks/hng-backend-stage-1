import { Request, Response } from "express";
import { ProfileDTO } from "./profile.dtos";
import { ProfileService } from "./profile.service";
import { sendSuccess } from "../../utils/api-response.util";

export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  async createProfile(req: Request, res: Response) {
    const data: ProfileDTO = req.body;
    const result = await this.profileService.createProfile(data);

    if ("message" in result) {
      sendSuccess(res, result.data, { message: result.message });
      return;
    }
    sendSuccess(res, result, { statusCode: 201 });
  }

  async getProfileById(req: Request, res: Response) {
    const data = await this.profileService.getProfileById(
      req.params.id as string,
    );
    sendSuccess(res, data, { statusCode: 200 });
  }

  async getAllProfiles(req: Request, res: Response) {
    const profiles = await this.profileService.getAllProfiles(req.query as any);

    sendSuccess(res, profiles.data, {
      statusCode: 200,
      pagination: profiles.pagination,
    });
  }

  async getProfilesBySearchQuery(req: Request, res: Response) {
    const profiles = await this.profileService.getProfilesBySearchQuery(
      req.query as any,
    );
    sendSuccess(res, profiles.data, {
      statusCode: 200,
      pagination: profiles.pagination,
    });
  }

  async deleteProfile(req: Request, res: Response) {
    await this.profileService.deleteProfile(req.params.id as string);
    sendSuccess(res, undefined, { statusCode: 204 });
  }
}
