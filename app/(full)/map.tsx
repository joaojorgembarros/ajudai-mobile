// app/(full)/map.tsx
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão", "Precisamos da sua localização para abrir o mapa.");
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setLoading(false);
    })();
  }, []);

  if (loading || !region) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
      >
        {/* Exemplo de marcador */}
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Você está aqui" />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
