import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/services/supabase/client";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";

type HistoryItem = {
  id: string;
  created_at: string;
  user_id: string;
  arena_id: string;
  score: number;
  total_questions: number;
};

const arenaTitles: { [key: string]: string } = {
  pe: "Private Equity Analyst",
  consulting: "Consulting",
  backend: "Backend SWE",
  frontend: "Frontend SWE",
};

export default function HistoryScreen() {
  const { user } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("history")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        if (error) {
          throw error;
        }
        setHistory(data || []);
      } catch (error) {
        console.error("Error fetching history: ", error);
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, [user]);

  if (loading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (history.length === 0) {
    return (
      <ThemedView>
        <ThemedText type="subtitle">No games played yet!</ThemedText>
        <ThemedText>Complete a quiz to see your history</ThemedText>
      </ThemedView>
    );
  }

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <ThemedView style={styles.card}>
      <ThemedText type="subtitle">
        {arenaTitles[item.arena_id] || "Unknown Arena"}
      </ThemedText>
      <ThemedText style={styles.score}>
        {`You scored: ${item.score} / ${item.total_questions}`}
      </ThemedText>
      <ThemedText style={styles.date}>
        {new Date(item.created_at).toLocaleDateString()}
      </ThemedText>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.header}>
          Game History
        </ThemedText>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    paddingBottom: 16,
  },
  list: {
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  score: {
    fontSize: 16,
    marginTop: 8,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
    alignSelf: "flex-end",
  },
});
