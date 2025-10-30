// app/settings.tsx
import { Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Configurações</Text>
      <Text>Em breve: alterar nome, e-mail, notificações, etc.</Text>
    </View>
  );
}
