import { drizzle } from 'drizzle-orm/d1'
export { sql, eq, and, or } from 'drizzle-orm'
import Auth0Provider from "next-auth/providers/auth0";
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import * as schema from '../database/schema'
import { AuthOptions } from 'next-auth';

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

let _auth: AuthOptions;
export function useAuth(){
  if (!_auth){
    _auth = {
  adapter: DrizzleAdapter(useDrizzle()),
  secret: 'test-123',
  providers: [
    Auth0Provider.default({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER!
    })
  ],
}
  }

  return _auth;
}