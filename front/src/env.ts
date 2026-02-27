import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().url().min(1, "Obrigatório"),
});

export const env = envSchema.parse(import.meta.env);