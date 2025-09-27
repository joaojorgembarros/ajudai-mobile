// app/auth/login.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from "react-native";
import { useRouter, type Href } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

// ⬇️ IMPORTA O LOADING
import LoadingWorld from "@/components/LoadingWorld";

const VALID_EMAIL = "joao@gmail.com";
const VALID_PASSWORD = "123";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const passRef = useRef<TextInput>(null);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    try {
      if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
        // simula latência para a animação aparecer
        await Promise.all([
          AsyncStorage.setItem("ajudai_token", "mock-token-123"),
          new Promise((r) => setTimeout(r, 3500)),
        ]);

        Keyboard.dismiss();
        router.replace("/home" as Href);
      } else {
        Alert.alert("Ops", "E-mail ou senha inválidos.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ⬇️ MODAL DE LOADING */}
      <LoadingWorld visible={loading} message="Entrando… preparando seu ambiente" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, justifyContent: "center", gap: 16 }}>
            <Text style={{ fontSize: 28, fontWeight: "800", textAlign: "center", marginBottom: 4 }}>
              Ajudaí
            </Text>
            <Text style={{ textAlign: "center", color: "#555", marginBottom: 8 }}>
              Entre para continuar
            </Text>

            {/* E-mail */}
            <View style={{ gap: 6 }}>
              <Text style={{ fontWeight: "600" }}>E-mail</Text>
              <TextInput
                placeholder="seuemail@exemplo.com"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passRef.current?.focus()}
                value={email}
                onChangeText={setEmail}
                style={{
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 10,
                  padding: 12,
                }}
              />
            </View>

            {/* Senha com 'olhinho' */}
            <View style={{ gap: 6 }}>
              <Text style={{ fontWeight: "600" }}>Senha</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 10,
                  paddingHorizontal: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  ref={passRef}
                  placeholder="••••••"
                  secureTextEntry={secure}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  value={password}
                  onChangeText={setPassword}
                  style={{ flex: 1, paddingVertical: 12 }}
                />
                <TouchableOpacity onPress={() => setSecure((s) => !s)} hitSlop={10}>
                  <Ionicons
                    name={secure ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Botão Entrar */}
            <TouchableOpacity
              disabled={loading}
              onPress={handleLogin}
              style={{
                backgroundColor: "#2563eb",
                padding: 14,
                borderRadius: 10,
                alignItems: "center",
                opacity: loading ? 0.7 : 1,
                marginTop: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                {loading ? "Entrando..." : "Entrar"}
              </Text>
            </TouchableOpacity>

            {/* Ações secundárias */}
            <TouchableOpacity onPress={() => router.push("/auth/register" as Href)}>
              <Text style={{ textAlign: "center", color: "#2563eb", fontWeight: "600", marginTop: 12 }}>
                Criar conta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/forgot" as Href)}>
              <Text style={{ textAlign: "center", color: "#2563eb", marginTop: 8 }}>
                Esqueci minha senha
              </Text>
            </TouchableOpacity>

            {/* Espaço extra para garantir rolamento quando teclado abre */}
            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
