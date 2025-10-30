// app/_layout.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("ajudai_token");
      const inAuth = segments[0] === "auth";

      if (!token) {
        if (!inAuth) router.replace("/auth/login");
        setChecking(false);
        return;
      }

      if (inAuth) {
        router.replace("/home");
        setChecking(false);
        return;
      }

      setChecking(false);
    })();
  }, [segments]);

  if (checking) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" translucent />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top", "bottom"]}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      {/* Barra de status com ícones escuros; mude para "light" se usar topo escuro */}
      <StatusBar style="dark" translucent />
      {/* SafeArea global para TODO o app */}
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top", "bottom"]}>
        <Slot />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
