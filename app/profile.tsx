// app/profile.tsx
import { Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Meu perfil</Text>
      <Text>Dados do usuário aqui…</Text>
    </View>
  );
}
