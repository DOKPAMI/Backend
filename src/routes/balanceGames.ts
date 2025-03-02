import { Router } from "express";
import { BalanceGameResult } from "../db/type.js";
import { db } from "../db/db.ts";

const balanceGameRouter = Router();

balanceGameRouter.get("/results", async (req, res) => {
  await db.balanceGameDB.read();
  res.json(db.balanceGameDB.data);
});

balanceGameRouter.get("/results/ratio", async (req, res) => {
  const { resultType } = req.query;
  await db.balanceGameDB.read();
  const percent = db.balanceGameDB.data.filter(
    (data) => data.resultType === resultType
  );

  res.json(db.balanceGameDB.data);
});

// curl -X POST http://localhost:5000/balancegame/results \
// -H "Content-Type: application/json" \
// -d '{"user": "tw", "result": "wow"}'
balanceGameRouter.post("/results", async (req: any, res: any) => {
  const { user, resultType }: BalanceGameResult = req.body;

  if (!user || !resultType) {
    return res.status(400).json({ error: "Missing user or result" });
  }

  try {
    await db.balanceGameDB.read();
    const newResult: BalanceGameResult = { user, resultType };

    db.balanceGameDB.data.push(newResult); // 데이터 추가
    await db.balanceGameDB.write();

    res.json(db.balanceGameDB.data);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default balanceGameRouter;
