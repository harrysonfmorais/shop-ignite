import { z } from 'zod'

const envSchema = z.object({
  STRIPE_PUBLIC_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables.',
    parsedEnv.error.flatten().fieldErrors,
  )

  throw new Error('Invalid environment variables.')
}

export const env = parsedEnv.data
