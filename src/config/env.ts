import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    GAMES_API_URL: z.string(),
  });

  const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (key.startsWith("VITE_")) {
        acc[key.replace("VITE_", "")] = value;
      }
      return acc;
    },
    {}
  );

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(parsedEnv.error.errors.join(", "));
  }

  return parsedEnv.data;
};

export const env = createEnv();
