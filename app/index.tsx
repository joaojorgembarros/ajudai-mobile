// app/index.tsx
import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home");
  }, [router]);
  return <View />;
}
