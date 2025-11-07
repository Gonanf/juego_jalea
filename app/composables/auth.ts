import { createAuthClient } from "better-auth/vue"
export const useAuth = () => {
  return createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
  });
}


