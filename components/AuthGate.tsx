import LoginScreen from "@/app/login";
import { useAuth } from "@/context/AuthContext";
import React, { PropsWithChildren } from "react";

export function AuthGate({ children }: PropsWithChildren) {
  const { user } = useAuth();
  console.log("USER: ", user);
  if (!user) return <LoginScreen />;
  return <>{children}</>;
}
