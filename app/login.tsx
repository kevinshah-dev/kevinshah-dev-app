import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { signInWithEmail, signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  async function handleSubmit() {
    if (mode === "login") await signInWithEmail(email, pw);
    else await signUp(email, pw);
  }
  console.log("nigga");
  return (
    <View style={styles.container}>
      <ThemedText type="title">Welcome to PEBet</ThemedText>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={pw}
        onChangeText={setPw}
      />
      <Button
        title={mode === "login" ? "Log In" : "Sign Up"}
        onPress={handleSubmit}
      />
      <Button
        title={
          mode === "login"
            ? "Need an account? Sign Up"
            : "Have an account? Log In"
        }
        onPress={() => setMode(mode === "login" ? "signup" : "login")}
      />
      <View style={{ height: 16 }} />
      <Button title="Continue with Google" onPress={signInWithGoogle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
  },
});
