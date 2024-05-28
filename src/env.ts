import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    IDP_CLIENT_ID: z.string(),
    IDP_SERVER: z.string().url(),
    IDP_SECRET: z.string(),
    REFRESH_TOKEN_URL: z.string().url(),
    END_SESSION_URL: z.string().url(),
    APP_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_API_BASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    APP_SECRET: process.env.APP_SECRET,
    IDP_CLIENT_ID: process.env.IDP_CLIENT_ID,
    IDP_SERVER: process.env.IDP_SERVER,
    IDP_SECRET: process.env.IDP_SECRET,
    REFRESH_TOKEN_URL: process.env.REFRESH_TOKEN_URL,
    END_SESSION_URL: process.env.END_SESSION_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
})
