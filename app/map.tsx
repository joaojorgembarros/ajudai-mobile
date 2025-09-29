// app/map.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Alert, Platform, TouchableOpacity, FlatList } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location";

type Provider = {
  id: string;
  name: string;
  category: "Advogado" | "Encanador" | "Jardineiro" | "Eletricista" | "TI";
  lat: number;
  lng: number;
};

const MOCK: Provider[] = [
  { id: "1", name: "Dra. Júlia - Advocacia", category: "Advogado",   lat: -23.5558, lng: -46.6396 },
  { id: "2", name: "Seu Zé - Encanador",     category: "Encanador",  lat: -23.5595, lng: -46.6350 },
  { id: "3", name: "Verde Vivo Jardins",     category: "Jardineiro", lat: -23.5608, lng: -46.6425 },
  { id: "4", name: "Luz & Cia",              category: "Eletricista",lat: -23.5530, lng: -46.6370 },
  { id: "5", name: "TechHelp TI",            category: "TI",         lat: -23.5570, lng: -46.6465 },
];

const CATEGORIES = ["Todos", "Advogado", "Encanador", "Jardineiro", "Eletricista", "TI"] as const;

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [filter, setFilter] = useState<typeof CATEGORIES[number]>("Todos");

  useEffect(() => {
    (async () => {
      // pede permissão
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não foi possível acessar sua localização.");
        // fallback: centro padrão (SP)
        setRegion({ latitude: -23.5558, longitude: -46.6396, latitudeDelta: 0.03, longitudeDelta: 0.03 });
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    })();
  }, []);

  const data = useMemo(() => {
    if (filter === "Todos") return MOCK;
    return MOCK.filter(p => p.category === filter);
  }, [filter]);

  if (!region) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Carregando mapa…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Filtros horizontais */}
      <View style={{ position: "absolute", top: 10, left: 0, right: 0, zIndex: 10 }}>
        <FlatList
          data={CATEGORIES as unknown as string[]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
          renderItem={({ item }) => {
            const active = item === filter;
            return (
              <TouchableOpacity
                onPress={() => setFilter(item as typeof filter)}
                style={{
                  backgroundColor: active ? "#2563eb" : "white",
                  borderColor: active ? "#2563eb" : "#e5e7eb",
                  borderWidth: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  marginRight: 8,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <Text style={{ color: active ? "white" : "#111827", fontWeight: "600" }}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(i) => i}
        />
      </View>

      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton
        toolbarEnabled
        loadingEnabled
        moveOnMarkerPress
      >
        {data.map(p => (
          <Marker key={p.id} coordinate={{ latitude: p.lat, longitude: p.lng }}>
            <Text style={{ fontSize: 20 }}>
              {p.category === "Advogado" ? "⚖️"
                : p.category === "Encanador" ? "🔧"
                : p.category === "Jardineiro" ? "🌿"
                : p.category === "Eletricista" ? "💡"
                : "💻"}
            </Text>
            <Callout onPress={() => Alert.alert(p.name, `Categoria: ${p.category}\n(em breve: detalhes)`)} tooltip={false}>
              <View style={{ padding: 8, maxWidth: 220 }}>
                <Text style={{ fontWeight: "700", marginBottom: 4 }}>{p.name}</Text>
                <Text style={{ color: "#6b7280" }}>{p.category}</Text>
                <Text style={{ color: "#2563eb", marginTop: 6 }}>Toque para detalhes</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
