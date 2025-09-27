import { View, Text, TextInput, ScrollView, Button } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function NewRequest() {
  const [form, setForm] = useState({ titulo: "", categoria: "", descricao: "", bairro: "" });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Novo pedido</Text>

      <Text>Título</Text>
      <TextInput style={{ backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, padding: 12, marginBottom: 10 }}
        placeholder="Ex.: Trocar chuveiro 220v" value={form.titulo}
        onChangeText={(v)=>setForm({...form, titulo:v})} />

      <Text>Categoria</Text>
      <TextInput style={{ backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, padding: 12, marginBottom: 10 }}
        placeholder="Ex.: Elétrica" value={form.categoria}
        onChangeText={(v)=>setForm({...form, categoria:v})} />

      <Text>Descrição</Text>
      <TextInput multiline numberOfLines={4}
        style={{ backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, padding: 12, marginBottom: 10 }}
        placeholder="Conte o que precisa..." value={form.descricao}
        onChangeText={(v)=>setForm({...form, descricao:v})} />

      <Text>Bairro</Text>
      <TextInput style={{ backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, padding: 12, marginBottom: 14 }}
        placeholder="Ex.: Centro" value={form.bairro}
        onChangeText={(v)=>setForm({...form, bairro:v})} />

      <Button title="Publicar pedido" onPress={()=>router.push("/proposals")} />
    </ScrollView>
  );
}
