import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { migrateDbIfNeeded } from "../database/migrate";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="game.db"
      onInit={migrateDbIfNeeded}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Money Hunter" }}
        />
        <Stack.Screen
          name="stages"
          options={{ title: "ステージ選択" }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
