import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewService() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left", "bottom"]}>
      <Ionicons name="construct-outline" size={48} color="#2563eb" />
      <Text style={styles.title}>Cadastrar novo serviço</Text>
      <Text style={styles.subtitle}>
        Preencha os detalhes do serviço que deseja oferecer para a comunidade.
      </Text>

      <Pressable
        onPress={() => router.back()}
        android_ripple={{ color: "#e5e7eb" }}
        style={styles.btn}
      >
        <Ionicons name="arrow-back-outline" size={20} color="#fff" />
        <Text style={styles.btnText}>Voltar</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  btn: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
