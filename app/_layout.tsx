// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Slot, useRouter, useSegments } from "expo-router";

export default function RootLayout() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const token = await AsyncStorage.getItem("ajudai_token");
      const inAuth = segments[0] === "auth"; // rotas dentro de app/auth/...

      // usuário NÃO logado
      if (!token) {
        // se não está em /auth, manda pro login
        if (!inAuth) router.replace("/auth/login");
        setChecking(false);
        return;
      }

      // usuário logado
      if (inAuth) {
        // está numa tela de auth mesmo com token → manda pra home
        router.replace("/home");
        setChecking(false);
        return;
      }

      setChecking(false);
    })();

    return () => {
      isMounted = false;
    };
  }, [segments]);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />; // renderiza a tela da rota atual
}
