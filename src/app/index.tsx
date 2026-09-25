import type { SQLiteDatabase } from "expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PlayerGoldRow = {
  gold: number;
};

async function getPlayerGold(db: SQLiteDatabase) {
  const player = await db.getFirstAsync<PlayerGoldRow>(
    "SELECT gold FROM player WHERE id = ?",
    1,
  );

  if (!player) {
    throw new Error("Player data was not found.");
  }

  return player.gold;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unknown error occurred.";
}

export default function Index() {
  const db = useSQLiteContext();
  const [gold, setGold] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadGold() {
      try {
        const savedGold = await getPlayerGold(db);
        if (isMounted) {
          setGold(savedGold);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error));
        }
      }
    }

    void loadGold();

    return () => {
      isMounted = false;
    };
  }, [db]);

  async function handleAddGold() {
    setIsSaving(true);
    setErrorMessage(null);

    try {
      await db.runAsync(
        "UPDATE player SET gold = gold + ? WHERE id = ?",
        100,
        1,
      );
      setGold(await getPlayerGold(db));
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>SQLite persistence test</Text>
      <Text style={styles.title}>Player Gold</Text>
      <Text style={styles.gold}>{gold === null ? "Loading..." : `${gold} G`}</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add 100 gold"
        disabled={gold === null || isSaving}
        onPress={handleAddGold}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          (gold === null || isSaving) && styles.buttonDisabled,
        ]}
      >
        <Text style={styles.buttonText}>
          {isSaving ? "Saving..." : "+100 G"}
        </Text>
      </Pressable>

      <Text style={styles.hint}>
        Add gold, restart the app, and confirm that the value remains.
      </Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F4F7FB",
  },
  eyebrow: {
    marginBottom: 8,
    color: "#60708A",
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    color: "#172033",
    fontSize: 30,
    fontWeight: "700",
  },
  gold: {
    marginVertical: 28,
    color: "#C47A00",
    fontSize: 44,
    fontWeight: "800",
  },
  button: {
    minWidth: 180,
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#2457D6",
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  hint: {
    maxWidth: 320,
    marginTop: 24,
    color: "#60708A",
    lineHeight: 20,
    textAlign: "center",
  },
  error: {
    marginTop: 16,
    color: "#B42318",
    textAlign: "center",
  },
});
