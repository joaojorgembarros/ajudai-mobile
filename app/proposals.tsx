import { View, Text, ScrollView, Button } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

const INITIAL = [
  { id: 101, pedido: "Troca de chuveiro 220v", prestador: "Ana Luz", valor: "R$ 150", prazo: "Hoje, 18h", mensagem: "Levo materiais e garantia de 90 dias.", status: "pendente" },
  { id: 102, pedido: "Cortar grama (50m²)", prestador: "Gil Jardim", valor: "R$ 120", prazo: "Amanhã, manhã", mensagem: "Inclui coleta e descarte.", status: "pendente" },
];

export default function Proposals() {
  const [propostas, setPropostas] = useState(INITIAL);

  const aceitar = (id:number) => {
    setPropostas(prev => prev.map(p => p.id === id ? { ...p, status: "aceita" } : p));
    router.push("/checkout");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Propostas recebidas</Text>

      {propostas.map((p) => (
        <View key={p.id} style={{ backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, padding: 12, marginBottom: 10 }}>
          <Text style={{ color: "#6b7280", fontSize: 12 }}>{p.pedido}</Text>
          <Text style={{ fontWeight: "700" }}>{p.prestador}</Text>
          <Text style={{ color: "#4b5563" }}>{p.mensagem}</Text>

          <View style={{ marginTop: 8, marginBottom: 8 }}>
            <Text>Valor: {p.valor}</Text>
            <Text>Quando: {p.prazo}</Text>
            <Text>Status: {p.status}</Text>
          </View>

          {p.status === "pendente" ? (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Button title="Recusar" onPress={()=>setPropostas(prev=>prev.filter(x=>x.id!==p.id))} />
              <Button title="Aceitar" onPress={()=>aceitar(p.id)} />
            </View>
          ) : (
            <Button title="Ir ao chat" onPress={()=>router.push("/chat")} />
          )}
        </View>
      ))}
    </ScrollView>
  );
}
