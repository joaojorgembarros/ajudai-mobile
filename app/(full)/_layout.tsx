// app/(full)/_layout.tsx
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function FullLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
