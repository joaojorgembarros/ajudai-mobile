// app/auth/forgot.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { router } from "expo-router";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  async function onRecover() {
    if (!isEmail(email)) {
      Alert.alert("Atenção", "Informe um e-mail válido.");
      return;
    }
    setLoading(true);
    try {
      // MOCK: aqui futuramente chamaremos sua API (ex.: POST /auth/forgot)
      await new Promise(r => setTimeout(r, 600));
      Alert.alert(
        "Verifique seu e-mail",
        "Se este e-mail estiver cadastrado, você receberá instruções para redefinir a senha.",
        [{ text: "OK", onPress: () => router.replace("/auth/login") }]
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, justifyContent: "center", gap: 14 }}>
          <Text style={{ fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 8 }}>
            Esqueci minha senha
          </Text>

          <Text>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="voce@email.com"
            style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 12 }}
          />

          <TouchableOpacity
            disabled={loading}
            onPress={onRecover}
            style={{ backgroundColor: "#2563eb", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 8, opacity: loading ? 0.7 : 1 }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>{loading ? "Enviando..." : "Enviar link"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "#2563eb" }}>Voltar ao login</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
