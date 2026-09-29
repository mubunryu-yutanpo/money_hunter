import type { SQLiteDatabase } from "expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { GameHeader } from "@/components/GameHeader";

const EXP_REQUIRED_FOR_NEXT_LEVEL = 100;

type PlayerStatusRow = {
  level: number;
  exp: number;
  gold: number;
};

async function getPlayerStatus(db: SQLiteDatabase) {
  const player = await db.getFirstAsync<PlayerStatusRow>(
    "SELECT level, exp, gold FROM player WHERE id = ?",
    1,
  );

  if (!player) {
    throw new Error("プレイヤーデータが見つかりませんでした。");
  }

  return player;
}


function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "An unknown error occurred.";
}

export default function Index() {
  const db = useSQLiteContext();
  const [player, setPlayer] = useState<PlayerStatusRow | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPlayer() {
      try {
        const savedPlayer = await getPlayerStatus(db);
        if (isMounted) {
          setPlayer(savedPlayer);
        }

      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error));
        }
      }
    }

    void loadPlayer();

    return () => {
      isMounted = false;
    };
  }, [db]);

  return (
    <View style={styles.container}>
      <GameHeader
        playerName="ジリ貧まる"
        level={player?.level}
        exp={player?.exp ?? 0}
        expRequired={EXP_REQUIRED_FOR_NEXT_LEVEL}
        gold={player?.gold}
      />

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  errorMessage: {
    color: "#b42318",
    fontSize: 12,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
});
