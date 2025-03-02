import express, { Request, Response } from "express"; // Request, Response 타입을 가져오기
import dotenv from "dotenv";
import cors from "cors";

import apiRouter from "./routes/index.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
  res.json({ message: "hello, blockblock!" });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 10분(600,000ms)마다 실행
fetchResults();
setInterval(fetchResults, 600000);

// 10분마다 실행되는 함수 -> render 무료 버전 서버 유지용
function fetchResults() {
  const now = new Date().toLocaleString(); // 현재 시각 (로컬 시간대 기준)

  fetch("https://backend-60km.onrender.com/api/balancegames/results")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => console.log(now, "data length:", data.length))
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
