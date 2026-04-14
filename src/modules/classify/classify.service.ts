import { AppError } from "../../utils/app-error.util";
import {
  ClassifyApiResponseDTO,
  ClassifyQueryDTO,
  ClassifyResponseDTO,
} from "./classify.dtos";

export class ClassifyService {
  constructor(private genderizeApi: string) {}

  async classifyName(data: ClassifyQueryDTO): Promise<ClassifyResponseDTO> {
    const response = await fetch(`${this.genderizeApi}/?name=${data.name}`);

    if (!response.ok) {
      throw new AppError("Failed to classify name", 500);
    }

    const res: ClassifyApiResponseDTO = await response.json();

    const sample_size = res.count;

    const payload = {
      name: res.name,
      gender: res.gender,
      probability: res.probability,
      sample_size,
      is_confident: res.probability > 0.7 && sample_size >= 100,
    };

    return payload;
  }
}
