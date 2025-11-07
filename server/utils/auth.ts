import { D1Dialect } from 'kysely-d1'
import type { D1Database } from '@cloudflare/workers-types'
import { Kysely } from 'kysely'
import { betterAuth, string } from "better-auth"
import { DrizzleD1Database } from "drizzle-orm/d1";

let _auth: ReturnType<typeof betterAuth>
export function auth() {
  if (!_auth) _auth = betterAuth({
    database: {
      db: new Kysely({
        dialect: new D1Dialect({
          database: hubDatabase() as D1Database,
        })
      }),
      type: "sqlite"
    },
    user: {
        additionalFields: {
          nickname: {
            type: "string",
            required: true,
            input: true,
          }
        },
      },
    baseURL: getBaseURL(),
      emailAndPassword: {
        enabled: true,
      },
    socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
      },
      account: {
        accountLinking: {
          enabled: true,
        },
      },
      trustedOrigins: ["http://locaalhost:8787","http://locaalhost:8788","http://locaalhost:3000","https://juegojalea.boldwave.org"]
  })

  return _auth
}

function getBaseURL() {
  const envBase = process.env.BETTER_AUTH_URL
  const runtimeAppUrl = (() => {
    try {
      const rc = useRuntimeConfig?.()
      return rc?.appUrl as string | undefined
    }
    catch {
      return undefined
    }
  })()

  let baseURL = envBase || runtimeAppUrl

  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin
    }
    catch {
      // ignore
    }
  }

  return typeof baseURL === 'string' ? baseURL.replace(/\/+$/, '') : baseURL
}