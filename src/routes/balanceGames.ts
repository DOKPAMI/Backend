import { Router } from "express";
import { BalanceGameResult } from "../db/type.js";
import { db } from "../db/db.ts";

const balanceGameRouter = Router();

balanceGameRouter.get("/results", async (req, res) => {
  await db.balanceGameDB.read();
  res.json(db.balanceGameDB.data);
});

// curl -X POST http://localhost:5000/balancegame/results \
// -H "Content-Type: application/json" \
// -d '{"user": "tw", "result": "wow"}'
balanceGameRouter.post("/results", async (req: any, res: any) => {
  const { user, result }: BalanceGameResult = req.body;

  if (!user || !result) {
    return res.status(400).json({ error: "Missing user or result" });
  }

  try {
    await db.balanceGameDB.read();
    const newResult: BalanceGameResult = { user, result };

    db.balanceGameDB.data.push(newResult); // 데이터 추가
    await db.balanceGameDB.write();

    res.json(db.balanceGameDB.data);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default balanceGameRouter;
