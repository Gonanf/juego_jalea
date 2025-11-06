import { drizzle } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'
import Auth0Provider from "next-auth/providers/auth0";
import { DrizzleAdapter, } from "@auth/drizzle-adapter"
import { NuxtAuthHandler } from '#auth'
import * as schema from '../database/schema'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

