import React, { useEffect, useMemo, useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = { visible: boolean; message?: string };

const ROLES = ["🧑‍💻", "👩‍🔧", "👨‍🌾", "👷‍♂️", "🧑‍🍳", "👩‍🏫", "🧑‍🔬", "🧑‍🎨"];

export default function LoadingWorld({ visible, message }: Props) {
  const size = 200;                     // diâmetro do "planeta"
  const r = size * 0.5 + 14;            // raio da órbita da pessoinha
  const center = useMemo(() => ({ x: 0, y: 0 }), []);

  // rotação do planeta
  const earth = useSharedValue(0);
  // ângulo de órbita da pessoinha
  const theta = useSharedValue(0);

  // “trajetória” contínua
  useEffect(() => {
    earth.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );
    theta.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 6000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  // troca de papel a cada 2s
  const [role, setRole] = useState(ROLES[0]);
  useEffect(() => {
    const id = setInterval(() => {
      const next = ROLES[Math.floor(Math.random() * ROLES.length)];
      setRole(next);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  // estilo do planeta (emoji girando)
  const earthStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${earth.value}rad` }],
    };
  });

  // posição da pessoinha na órbita + “passinho” (bob)
  const personStyle = useAnimatedStyle(() => {
    const x = r * Math.cos(theta.value);
    const y = -r * Math.sin(theta.value);
    const bob = 4 * Math.sin(theta.value * 4); // sobe-desce leve
    return {
      transform: [
        { translateX: x },
        { translateY: y + bob },
        { rotate: `${theta.value + Math.PI / 2}rad` }, // acompanha a curva
      ],
    };
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.stage}>
          {/* eixo no centro para facilitar a órbita */}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {/* planeta */}
            <Animated.View style={[styles.planetWrap, earthStyle]}>
              <Text style={styles.planetEmoji}>🌍</Text>
            </Animated.View>

            {/* pessoinha */}
            <Animated.View style={[styles.person, personStyle]}>
              <Text style={styles.personEmoji}>{role}</Text>
            </Animated.View>
          </View>

          <Text style={styles.caption}>
            {message ?? "Carregando… Encontrando tarefas perto de você"}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  stage: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  planetWrap: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  planetEmoji: { fontSize: 160 },
  person: {
    position: "absolute",
    left: 100, // centro X (metade do planeta)
    top: 100,  // centro Y
    // O translateX/Y animado parte deste centro
  },
  personEmoji: { fontSize: 36, textAlign: "center" },
  caption: {
    color: "white",
    marginTop: 24,
    fontSize: 16,
    textAlign: "center",
  },
});
