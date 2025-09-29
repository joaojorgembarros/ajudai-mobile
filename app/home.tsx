// app/home.tsx
import { View, Text, Button, ScrollView } from "react-native";
import { useRouter, type Href } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function Home() {
  const router = useRouter();

  async function logout() {
    await AsyncStorage.removeItem("ajudai_token");
    router.replace("/auth/login" as Href);
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
        Ajudaí — Home
      </Text>

      <View style={{ gap: 8, marginBottom: 16 }}>
        <Button title="Abrir mapa" onPress={() => router.push("/map" as Href)} />

        <Button title="Novo pedido" onPress={() => router.push("/new-request" as Href)} />
        <Button title="Propostas" onPress={() => router.push("/proposals" as Href)} />
        <Button title="Chat" onPress={() => router.push("/chat" as Href)} />
        <Button title="Checkout" onPress={() => router.push("/checkout" as Href)} />
      </View>

      <Button title="Sair" color="#ef4444" onPress={logout} />
    </ScrollView>
  );
}
