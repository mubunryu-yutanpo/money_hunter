import type { SQLiteDatabase } from "expo-sqlite";

const DATABASE_VERSION = 1;

type DatabaseVersionRow = {
  user_version: number;
};

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync("PRAGMA journal_mode = WAL;");
  await db.execAsync("PRAGMA foreign_keys = ON;");

  const result = await db.getFirstAsync<DatabaseVersionRow>(
    "PRAGMA user_version",
  );
  const currentVersion = result?.user_version ?? 0;

  if (currentVersion > DATABASE_VERSION) {
    throw new Error(
      `Database version ${currentVersion} is newer than supported version ${DATABASE_VERSION}.`,
    );
  }

  if (currentVersion === 0) {
    await db.withExclusiveTransactionAsync(async (transaction) => {
      await transaction.execAsync(`
        CREATE TABLE IF NOT EXISTS player (
          id INTEGER PRIMARY KEY NOT NULL,
          level INTEGER NOT NULL DEFAULT 1,
          exp INTEGER NOT NULL DEFAULT 0,
          hp INTEGER NOT NULL DEFAULT 100,
          gold INTEGER NOT NULL DEFAULT 0
        );
      `);

      await transaction.runAsync(
        `INSERT OR IGNORE INTO player (id, level, exp, hp, gold)
         VALUES (?, ?, ?, ?, ?)`,
        1,
        1,
        0,
        100,
        0,
      );
    });

    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
}
