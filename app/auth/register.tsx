// app/auth/register.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  async function onRegister() {
    if (!name.trim() || !email.trim() || !pass.trim()) {
      Alert.alert("Atenção", "Preencha nome, e-mail e senha.");
      return;
    }
    if (!isEmail(email)) {
      Alert.alert("Atenção", "E-mail inválido.");
      return;
    }
    setLoading(true);
    try {
      // MOCK: aqui futuramente chamaremos sua API (ex.: POST /users)
      await new Promise(r => setTimeout(r, 600));
      Alert.alert("Conta criada!", "Faça login com seu e-mail e senha.", [
        { text: "OK", onPress: () => router.replace("/auth/login") },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, justifyContent: "center", gap: 14 }}>
          <Text style={{ fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 8 }}>
            Criar conta
          </Text>

          <Text>Nome completo</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
            style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 12 }}
          />

          <Text style={{ marginTop: 6 }}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="voce@email.com"
            style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 12 }}
          />

          <Text style={{ marginTop: 6 }}>Senha</Text>
          <View style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, paddingHorizontal: 12, flexDirection: "row", alignItems: "center" }}>
            <TextInput
              value={pass}
              onChangeText={setPass}
              secureTextEntry={secure}
              placeholder="••••••"
              autoCapitalize="none"
              style={{ flex: 1, paddingVertical: 12 }}
            />
            <TouchableOpacity onPress={() => setSecure(s => !s)} hitSlop={10}>
              <Ionicons name={secure ? "eye-off-outline" : "eye-outline"} size={22} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={onRegister}
            style={{ backgroundColor: "#16a34a", padding: 14, borderRadius: 10, alignItems: "center", marginTop: 8, opacity: loading ? 0.7 : 1 }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>{loading ? "Cadastrando..." : "Cadastrar"}</Text>
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
