import { BaseRepository } from "../../common/repositories/base.repository";
import { CreateProfileDTO, UpdateProfileDTO } from "./profile.dtos";
import { ProfileModel } from "./profile.model";
import { Profile } from "./profile.types";

export class ProfileRepository extends BaseRepository<
  Profile,
  CreateProfileDTO,
  UpdateProfileDTO
> {
  constructor() {
    super(ProfileModel);
  }

  protected toEntity(doc: any): Profile {
    const obj = doc.toObject ? doc.toObject() : { ...doc };
    const { _id, __v, ...rest } = obj;
    return rest as Profile;
  }

  async findById(id: string): Promise<Profile | null> {
    const doc = await ProfileModel.findOne({ id });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<void> {
    await ProfileModel.deleteOne({ id });
  }

  async findByName(name: string): Promise<Profile | null> {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const doc = await ProfileModel.findOne({
      name: { $regex: new RegExp(`^${escaped}$`, "i") },
    });
    return doc ? this.toEntity(doc) : null;
  }

  async findAllFiltered(filters: {
    gender?: string;
    country_id?: string;
    age_group?: string;
  }): Promise<Profile[]> {
    const query: Record<string, any> = {};
    if (filters.gender)
      query.gender = { $regex: new RegExp(`^${filters.gender}$`, "i") };
    if (filters.country_id)
      query.country_id = { $regex: new RegExp(`^${filters.country_id}$`, "i") };
    if (filters.age_group)
      query.age_group = { $regex: new RegExp(`^${filters.age_group}$`, "i") };

    const docs = await ProfileModel.find(query);
    return docs.map((doc) => this.toEntity(doc));
  }
}
