import { z } from "zod"

export const envSchema = z.object({
  NODE_ENV: z.enum(["local", "production", "test"]).default("local"),
  PORT: z.coerce.number().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  FRONTEND_URL: z.string().default("http://localhost:3000"),
  LOGGER_LEVEL: z
    .enum(["log", "debug", "info", "warn", "error"])
    .default("log"),
  APPLICATION_TITLE: z.string().default("API"),
  APPLICATION_DESCRIPTION: z.string().default("DESCRIPTION"),
  MAIL_HOST: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_SECURITY: z.coerce.boolean().default(false),
  MAIL_USER: z.string(),
  MAIL_PASS: z.string(),
  MAIL_FROM: z.string(),
})

export type Env = z.infer<typeof envSchema>
