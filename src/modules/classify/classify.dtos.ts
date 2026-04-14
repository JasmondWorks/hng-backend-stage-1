export class ClassifyApiResponseDTO {
  name!: string;
  gender!: string;
  probability!: number;
  count!: number;
}

export class ClassifyResponseDTO {
  name!: string;
  gender!: string;
  probability!: number;
  sample_size!: number;
  is_confident!: boolean;
}

export class ClassifyQueryDTO {
  name!: string;
}
