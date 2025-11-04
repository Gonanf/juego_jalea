import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { NuxtAuthHandler } from '#auth'
import { useDrizzle } from '~~/server/utils/drizzle'
import Auth0 from "@auth/core/providers/auth0";

export default NuxtAuthHandler({
  secret: 'test-123',
  providers: [
    Auth0Provider.default({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER!
    })
  ],
})