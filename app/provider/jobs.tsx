import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Jobs() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left", "bottom"]}>
      <Text style={styles.title}>Meus serviços 🧰</Text>
      <Text style={styles.subtitle}>Gerencie seus trabalhos e disponibilidade.</Text>
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
  title: { fontSize: 20, fontWeight: "700", color: "#111827" },
  subtitle: { fontSize: 14, color: "#6b7280", marginTop: 8 },
});
