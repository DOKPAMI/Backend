import path from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { BalanceGameResult } from "./type.js";

const adapter = (name: string) =>
  new JSONFile<BalanceGameResult[]>(
    path.resolve(process.cwd(), `src/data/${name}-data.json`)
  );

const balanceGameDB = new Low<BalanceGameResult[]>(adapter("balancegame"), []);

const db = {
  balanceGameDB: balanceGameDB,
};

async function initializeDB() {
  await Promise.all(Object.values(db).map((each_db) => each_db.read()));
}

initializeDB();

export { db };
