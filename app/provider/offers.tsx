import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Offers() {
  const mockOffers = [
    { id: 1, client: "Maria Silva", service: "Pintura residencial", value: "R$ 350,00" },
    { id: 2, client: "Carlos Pereira", service: "Limpeza de jardim", value: "R$ 180,00" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left", "bottom"]}>
      <Text style={styles.title}>Minhas propostas 📩</Text>
      <Text style={styles.subtitle}>Veja as solicitações recebidas dos clientes.</Text>

      <ScrollView style={{ width: "100%", marginTop: 16 }}>
        {mockOffers.map((item) => (
          <View key={item.id} style={styles.card}>
            <Ionicons name="briefcase-outline" size={24} color="#2563eb" />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.service}</Text>
              <Text style={styles.cardSub}>{item.client}</Text>
            </View>
            <Text style={styles.cardValue}>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
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
    textAlign: "center",
    marginTop: 4,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: { fontWeight: "700", fontSize: 15, color: "#111827" },
  cardSub: { fontSize: 13, color: "#6b7280" },
  cardValue: { fontWeight: "600", color: "#2563eb" },
});
