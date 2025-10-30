// app/home.tsx
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter, type Href } from "expo-router";
import React, { useState, type ComponentProps } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Mode = "cliente" | "prestador";
type IconName = ComponentProps<typeof Ionicons>["name"];

export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("cliente");

  async function logout() {
    await AsyncStorage.removeItem("ajudai_token");
    setMenuOpen(false);
    router.replace("/auth/login");
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>Ajudaí</Text>

        <View style={styles.modeSwitch}>
          <Pressable
            onPress={() => setMode("cliente")}
            style={[styles.modeBtn, mode === "cliente" && styles.modeBtnActive]}
          >
            <Text
              style={[
                styles.modeBtnText,
                mode === "cliente" && styles.modeBtnTextActive,
              ]}
            >
              Contratar
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode("prestador")}
            style={[styles.modeBtn, mode === "prestador" && styles.modeBtnActive]}
          >
            <Text
              style={[
                styles.modeBtnText,
                mode === "prestador" && styles.modeBtnTextActive,
              ]}
            >
              Oferecer
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.avatarBtn} onPress={() => setMenuOpen(true)}>
          <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </Pressable>
      </View>

      {/* Dropdown do perfil (no topo) */}
      <Modal visible={menuOpen} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />
        <View style={styles.topSheet}>
          <View style={styles.sheetHeader}>
            <Ionicons name="person-circle-outline" size={22} color="#111827" />
            <Text style={styles.sheetTitle}>João Jorge</Text>
          </View>

          <Link href={"/profile" as Href} asChild>
            <Pressable style={styles.sheetRow}>
              <Ionicons name="person-outline" size={18} color="#111827" />
              <Text style={styles.sheetRowText}>Perfil</Text>
            </Pressable>
          </Link>

          <Link href={"/settings" as Href} asChild>
            <Pressable style={styles.sheetRow}>
              <Ionicons name="settings-outline" size={18} color="#111827" />
              <Text style={styles.sheetRowText}>Configurações</Text>
            </Pressable>
          </Link>

          <Pressable style={[styles.sheetRow, { marginTop: 4 }]} onPress={logout}>
            <Ionicons name="exit-outline" size={18} color="#b91c1c" />
            <Text style={[styles.sheetRowText, { color: "#b91c1c" }]}>Sair</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {/* Card principal (muda conforme o modo) */}
        {mode === "cliente" ? (
          <Link href={"/new-request" as Href} asChild>
            <Pressable style={styles.mainCard}>
              <Ionicons name="add-circle-outline" size={32} color="#2563eb" />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Novo pedido</Text>
                <Text style={styles.cardSubtitle}>Descreva o que você precisa</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </Link>
        ) : (
          <Link href={"/provider/new-service" as Href} asChild>
            <Pressable style={styles.mainCard}>
              <Ionicons name="construct-outline" size={32} color="#2563eb" />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>Cadastrar serviço</Text>
                <Text style={styles.cardSubtitle}>Divulgue o que você faz</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </Pressable>
          </Link>
        )}

        {/* Grid de atalhos */}
        {mode === "cliente" ? (
          <View style={styles.grid}>
            <Option href={"/(full)/map" as Href} icon="map-outline" label="Mapa" />
            <Option href={"/proposals" as Href} icon="document-text-outline" label="Propostas" />
            <Option href={"/chat" as Href} icon="chatbubbles-outline" label="Chat" />
            <Option href={"/checkout" as Href} icon="card-outline" label="Pagamentos" />
            <Option href={"/favorites" as Href} icon="heart-outline" label="Favoritos" />
            <Option href={"/help" as Href} icon="help-circle-outline" label="Ajuda" />
          </View>
        ) : (
          <View style={styles.grid}>
            <Option href={"/provider/offers" as Href} icon="send-outline" label="Minhas ofertas" />
            <Option href={"/provider/jobs" as Href} icon="briefcase-outline" label="Meus serviços" />
            <Option href={"/wallet" as Href} icon="wallet-outline" label="Carteira" />
            <Option href={"/ratings" as Href} icon="star-outline" label="Avaliações" />
            <Option href={"/chat" as Href} icon="chatbubbles-outline" label="Chat" />
            <Option href={"/settings" as Href} icon="settings-outline" label="Configurações" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/** Item da grade */
function Option({
  href,
  icon,
  label,
}: {
  href: Href;                // <- tipagem correta do href
  icon: IconName;           // <- tipagem do nome do ícone
  label: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.optionCard} android_ripple={{ color: "#eef2ff" }}>
        <Ionicons name={icon} size={24} color="#2563eb" />
        <Text style={styles.optionLabel}>{label}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f9fafb" },

  header: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brand: { color: "#fff", fontWeight: "800", fontSize: 20, flex: 1 },

  modeSwitch: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.18)",
    padding: 4,
    borderRadius: 999,
    gap: 4,
  },
  modeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  modeBtnActive: { backgroundColor: "#fff" },
  modeBtnText: { color: "#e5edff", fontSize: 12, fontWeight: "700" },
  modeBtnTextActive: { color: "#2563eb" },

  avatarBtn: { padding: 2 },

  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  cardTitle: { fontWeight: "800", fontSize: 16, color: "#111827" },
  cardSubtitle: { color: "#6b7280", fontSize: 13 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  optionCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 22,
    gap: 8,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  optionLabel: { fontWeight: "700", color: "#111827" },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  topSheet: {
    position: "absolute",
    top: 62,
    right: 12,
    left: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    gap: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#eef2f7",
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    marginBottom: 4,
  },
  sheetTitle: { fontWeight: "700", color: "#111827", fontSize: 16 },
  sheetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  sheetRowText: { fontSize: 15, color: "#111827" },
});
