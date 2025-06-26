import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { peQuestions } from "@/data/quizzes/pe";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";

type RootStackParamList = {
  quiz: { arenaId: string };
  results: { score: number; total: number; arenaId: string };
};

type QuizNavProp = NativeStackNavigationProp<RootStackParamList, "quiz">;

type QuizRouteProp = RouteProp<RootStackParamList, "quiz">;

export default function QuizScreen() {
  const navigation = useNavigation<QuizNavProp>();
  const route = useRoute<QuizRouteProp>();
  const { arenaId } = route.params;

  const questions = arenaId === "pe" ? peQuestions : [];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[current];

  function selectOption(optionId: string) {
    const isCorrect = optionId === question.correctOptionId;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((a) => ({ ...a, [question.id]: optionId }));
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      navigation.navigate("results", {
        score: score + (isCorrect ? 1 : 0),
        total: questions.length,
        arenaId: arenaId,
      });
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">{`Question ${current + 1} of ${
          questions.length
        }`}</ThemedText>
        <ThemedText>{question.question}</ThemedText>
        <View style={styles.options}>
          {question.options.map((opt: any) => (
            <Pressable
              key={opt.id}
              style={styles.optionCard}
              onPress={() => selectOption(opt.id)}
            >
              <ThemedText
                type="defaultSemiBold"
                darkColor="#11181C"
              >{`${opt.id}. ${opt.text}`}</ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 16, justifyContent: "flex-start" },
  question: { marginVertical: 16 },
  options: { flex: 1, justifyContent: "center", gap: 12 },
  optionCard: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
});
