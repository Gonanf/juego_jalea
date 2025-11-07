import Auth0Provider from "next-auth/providers/auth0";
import { DrizzleAdapter, } from "@auth/drizzle-adapter"
import { NuxtAuthHandler } from '#auth'

let _auth: ReturnType<typeof NuxtAuthHandler>
export default eventHandler( event => {
    if (!_auth) _auth = NuxtAuthHandler({
    adapter: DrizzleAdapter(useDrizzle()),
    secret: 'test-123',
    providers: [
      Auth0Provider.default({
        clientId: process.env.AUTH0_ID,
        clientSecret: process.env.AUTH0_SECRET,
        issuer: process.env.AUTH0_ISSUER!
      })
    ],
  })

    return _auth(event)
})