import { createAuthClient } from "better-auth/vue"
import { adminClient } from "better-auth/client/plugins"
export const useAuth = () => {
  return createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL!,
    plugins: [
      adminClient()
    ] 
  });
}


