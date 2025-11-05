import Auth0Provider from "next-auth/providers/auth0";
import GoogleProvider from "next-auth/providers/google";
import Google from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { NuxtAuthHandler } from '#auth'
import Auth0 from "@auth/core/providers/auth0";
import { useAuth } from "~~/server/utils/drizzle";

export default NuxtAuthHandler(useAuth())