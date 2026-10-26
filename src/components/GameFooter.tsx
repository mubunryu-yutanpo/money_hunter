import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

export function GameFooter() {
  return (
    <View style={styles.footer}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="ショップ"
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Image
          source={require("@/assets/images/ui/shop.png")}
          style={styles.actionIcon}
          contentFit="contain"
        />
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="冒険に出る"
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Image
          source={require("@/assets/images/ui/dungeon.png")}
          style={styles.actionIcon}
          contentFit="contain"
        />
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="装備"
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Image
          source={require("@/assets/images/ui/equipment.png")}
          style={styles.actionIcon}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    backgroundColor: "#c8c2bc",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
  },

  actionButton: {
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#cc9b6d",
    borderRadius: 100,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },

  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },

  actionIcon: {
    height: 60,
    width: 60,
  },
});
