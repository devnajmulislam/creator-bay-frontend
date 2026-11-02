import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;

export async function getAuthToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const client = authClient as any;
    if (typeof client.token === "function") {
      const res = await client.token();
      if (res?.data) {
        return typeof res.data === "string" ? res.data : res.data?.token || null;
      }
    }

    const session = await authClient.getSession();
    if (session && session.data) {
      const sessionData = session.data as unknown as { token?: string };
      if (sessionData.token) {
        return sessionData.token;
      }
    }

    const match = document.cookie.match(/(?:^|;)\s*better-auth\.session_token=([^;]*)/) || document.cookie.match(/(?:^|;)\s*better-auth\.jwt=([^;]*)/);
    if (match) {
      return decodeURIComponent(match[1]);
    }
    return null;
  } catch {
    return null;
  }
}
