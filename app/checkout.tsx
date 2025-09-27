import { View, Text, ScrollView, Button, Alert } from "react-native";

export default function Checkout() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8fafc" }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ backgroundColor: "#fff", borderRadius: 16, borderWidth: 1, padding: 12 }}>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Resumo</Text>
        <Text>Serviço: Troca de chuveiro 220v</Text>
        <Text>Prestador: Ana Luz</Text>
        <Text>Valor: R$ 150</Text>
        <Text>Data: Hoje, 18h</Text>

        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: "700", marginBottom: 8 }}>Pagamento</Text>
          <Button title="Pagar (PIX - simulado)" onPress={()=>Alert.alert("Pagamento simulado!")} />
        </View>
      </View>
    </ScrollView>
  );
}
