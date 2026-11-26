import { StyleSheet, Text, View } from "react-native";

export default function StagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ステージ選択</Text>
      <Text style={styles.description}>
        ステージは次のステップで追加します。
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  title: {
    color: "#3f2a13",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
  },

  description: {
    color: "#6f6255",
    fontSize: 16,
  },
});
