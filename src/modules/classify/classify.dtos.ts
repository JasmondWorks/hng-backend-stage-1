export class ClassifyApiResponse {
  name!: string;
  gender!: string;
  probability!: number;
  count!: number;
}

export class ClassifyResponse {
  name!: string;
  gender!: string;
  probability!: number;
  sample_size!: number;
  is_confident!: boolean;
}
