import { useState } from "react";
import { View, Text, TextInput, ScrollView, Button } from "react-native";

export default function Chat() {
  const [chat, setChat] = useState([
    { de: "Ana Luz", texto: "Olá! Vi seu pedido do chuveiro." },
    { de: "Você", texto: "Oi Ana! Pode hoje às 18h?" },
  ]);
  const [msg, setMsg] = useState("");

  const send = () => {
    const v = msg.trim();
    if (!v) return;
    setChat(prev => [...prev, { de: "Você", texto: v }]);
    setMsg("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f8fafc", padding: 16 }}>
      <View style={{ backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, padding: 12, flex: 1 }}>
        <ScrollView>
          {chat.map((m, i) => (
            <View key={i} style={{
              maxWidth: "80%", padding: 8, borderRadius: 16, marginBottom: 8,
              alignSelf: m.de === "Você" ? "flex-end" : "flex-start",
              backgroundColor: m.de === "Você" ? "#000" : "#f3f4f6"
            }}>
              <Text style={{ fontSize: 11, opacity: 0.7, color: m.de === "Você" ? "#fff" : "#000" }}>{m.de}</Text>
              <Text style={{ color: m.de === "Você" ? "#fff" : "#000" }}>{m.texto}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
          <TextInput
            placeholder="Escreva uma mensagem"
            value={msg}
            onChangeText={setMsg}
            style={{ flex: 1, backgroundColor: "#fff", borderWidth: 1, borderRadius: 12, padding: 10 }}
          />
          <Button title="Enviar" onPress={send} />
        </View>
      </View>
    </View>
  );
}
