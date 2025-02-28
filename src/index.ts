import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { BalanceGameResult } from "./data/db/type.js";
import { db } from "./data/db/db.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 API 라우트
app.get("/", async (req, res) => {
  await db.balanceGameDB.read();
  res.json(db.balanceGameDB.data);
});

app.post("/", async (req, res) => {
  const result: BalanceGameResult = { user: "tw", result: "wow" };

  try {
    await db.balanceGameDB.read();
    db.balanceGameDB.data.push(result); // 데이터 추가
    await db.balanceGameDB.write();
    res.json(db.balanceGameDB.data);
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
