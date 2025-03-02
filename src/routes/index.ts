import { Router } from "express";
import balanceGameRouter from "./balanceGames.ts";

const apiRouter = Router();

// 각각의 라우트를 /api 경로 아래에 등록
apiRouter.use("/balancegames", balanceGameRouter);

export default apiRouter;
