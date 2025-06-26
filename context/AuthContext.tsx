import { supabase } from "@/services/supabase/client";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type SessionUser = {
  id: string;
  email: string | null;
};

interface AuthCtx {
  user: SessionUser | null;
  signInWithEmail: (email: string, pw: string) => Promise<void>;
  signUp: (email: string, pw: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("event", event);
        console.log("session", session);
        if (session?.user) {
          setUser({ id: session.user.id, email: session.user.email });
        } else {
          setUser(null);
        }
      }
    );
    // get cached session on mount
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (s?.user) setUser({ id: s.user.id, email: s.user.email });
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signInWithEmail(email: string, pw: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pw,
    });
    if (error) throw error;
  }
  async function signUp(email: string, pw: string) {
    const { error } = await supabase.auth.signUp({ email, password: pw });
    if (error) throw error;
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async function signInWithGoogle() {
    console.log("signInWithGoogle");
    const redirectUrl = makeRedirectUri({
      scheme: "kevinshahdevapp", // <- same as app.json "scheme"
      path: "auth-callback",
    });

    console.log("redirectUrl", redirectUrl);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl },
    });
    console.log("data", data);
    console.log("error", error);
    if (error) throw error;
    const res = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
    if (res.type === "success") {
      const { url } = res;
      // We have the URL with the access token, now we need to set the session
      const params = new URLSearchParams(url.split("#")[1]);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error: setSessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (setSessionError) {
          throw setSessionError;
        }
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithEmail, signUp, signOut, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}
