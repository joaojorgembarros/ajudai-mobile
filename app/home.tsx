// app/home.tsx
import { View, Text, Button, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export default function Home() {
  const router = useRouter();

  async function logout() {
    await AsyncStorage.removeItem("ajudai_token");
    router.replace("/auth/login");
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
        Ajudaí — Home
      </Text>

      {/* seus atalhos de exemplo */}
      <View style={{ gap: 8, marginBottom: 16 }}>
        <Link href="/new-request" asChild>
          <Button title="Novo pedido" />
        </Link>

        <Link href="/proposals" asChild>
          <Button title="Propostas" />
        </Link>

        <Link href="/chat" asChild>
          <Button title="Chat" />
        </Link>

        <Link href="/checkout" asChild>
          <Button title="Checkout" />
        </Link>
      </View>

      <Button title="Sair" color="#ef4444" onPress={logout} />
    </ScrollView>
  );
}
