import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/services/supabase/client";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";

type RootStackParamList = {
  quiz: { arenaId: string };
  results: { score: number; total: number; arenaId: string };
};

type ResultsRouteProp = RouteProp<RootStackParamList, "results">;
type ResultsNavProp = NativeStackNavigationProp<RootStackParamList, "results">;

export default function ResultsScreen() {
  const route = useRoute<ResultsRouteProp>();
  const { user } = useAuth();

  const navigation = useNavigation<ResultsNavProp>();
  const { score, total, arenaId } = route.params;
  const buttonBackgroundColor = useThemeColor({}, "tint");

  const percent = Math.round((score / total) * 100);

  useEffect(() => {
    async function saveHistory() {
      if (!user) return;

      const { error } = await supabase.from("history").insert({
        user_id: user.id,
        arena_id: arenaId,
        score: score,
        total_questions: total,
      });

      if (error) {
        console.error("Error saving quiz history:", error);
      }
    }
    saveHistory();
  }, [user, score, total, arenaId]);

  return (
    <SafeAreaView style={styles.safe}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Quiz Complete!</ThemedText>
        <ThemedText type="subtitle">{`You scored ${score} out of ${total}`}</ThemedText>
        <ThemedText type="title">{`${percent}%`}</ThemedText>
        <Pressable
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
          onPress={() => navigation.popToTop()}
        >
          <ThemedText>Go Home</ThemedText>
        </Pressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
});
