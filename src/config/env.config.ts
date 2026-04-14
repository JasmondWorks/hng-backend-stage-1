export const envConfig = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 3000,
  debug: process.env.APP_DEBUG === "true",
  genderizeApiUrl: process.env.GENDERIZE_API_URL!,
};

const requiredEnvVars = ["genderizeApiUrl", "port", "env", "debug"];

requiredEnvVars.forEach((envVar) => {
  if (!envConfig[envVar as keyof typeof envConfig]) {
    throw new Error(`${envVar} is not defined`);
  }
});
