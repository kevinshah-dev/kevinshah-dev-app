import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// remove expo-image import
// import { Image } from 'expo-image';

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

type RootStackParamList = {
  quiz: { arenaId: string };
  results: { score: number; total: number };
};

type Arena = {
  id: string;
  title: string;
  description: string;
};

const arenas: Arena[] = [
  {
    id: "pe",
    title: "Private Equity Analyst",
    description: "Valuation & IRR drills",
  },
  {
    id: "consulting",
    title: "Consulting Case Interview",
    description: "Mini-case breakdowns",
  },
  {
    id: "backend",
    title: "Backend SWE",
    description: "Algorithmic coding",
  },
  {
    id: "frontend",
    title: "Frontend SWE",
    description: "JS & UI puzzles",
  },
];

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const backgroundColor = useThemeColor({}, "background");

  const renderArena = ({ item }: { item: Arena }) => {
    // pick the right icon
    let IconComponent: any = Ionicons;
    let iconName = "help-circle-outline";

    switch (item.id) {
      case "pe":
        IconComponent = Ionicons;
        iconName = "cash-outline";
        break;
      case "consulting":
        IconComponent = MaterialCommunityIcons;
        iconName = "chat-processing-outline";
        break;
      case "backend":
        IconComponent = Ionicons;
        iconName = "code-slash-outline";
        break;
      case "frontend":
        IconComponent = MaterialCommunityIcons;
        iconName = "monitor-edit";
        break;
    }

    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate("quiz", { arenaId: item.id })}
      >
        <IconComponent name={iconName} size={48} color="#4B5563" />
        <ThemedText type="subtitle" style={styles.cardTitle}>
          {item.title}
        </ThemedText>
        <ThemedText type="default">{item.description}</ThemedText>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.header}>
          Pick an Arena
        </ThemedText>

        <FlatList
          data={arenas}
          keyExtractor={(i) => i.id}
          numColumns={2}
          renderItem={renderArena}
          contentContainerStyle={styles.list}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 12 },
  list: { justifyContent: "space-between" },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { textAlign: "center", marginBottom: 4 },
});
