import express, { Request, Response } from "express"; // Request, Response 타입을 가져오기
import dotenv from "dotenv";
import cors from "cors";
import { BalanceGameResult } from "./db/type.js";
import { db } from "./db/db.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 API 라우트
app.get("/balancegame/results", async (req, res) => {
  await db.balanceGameDB.read();
  res.json(db.balanceGameDB.data);
});

// curl -X POST http://localhost:5000/balancegame/results \
// -H "Content-Type: application/json" \
// -d '{"user": "tw", "result": "wow"}'
app.post("/balancegame/results", async (req: any, res: any) => {
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

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
