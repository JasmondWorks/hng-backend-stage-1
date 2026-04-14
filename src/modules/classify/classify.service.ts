import { AppError } from "src/utils/app-error.util";
import { ClassifyApiResponse, ClassifyResponse } from "./classify.dtos";

export class ClassifyService {
  constructor(private genderizeApi: string) {}

  async classifyName(name: string): Promise<ClassifyResponse> {
    const response = await fetch(`${this.genderizeApi}/?name=${name}`);

    if (!response.ok) {
      throw new AppError("Failed to classify name", 500);
    }

    const data: ClassifyApiResponse = await response.json();

    const sample_size = data.count;

    const payload = {
      name,
      gender: data.gender,
      probability: data.probability,
      sample_size,
      is_confident: data.probability > 0.7 && sample_size >= 100,
    };

    return payload;
  }
}
