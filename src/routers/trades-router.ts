import { Router } from "express";
import { tradeSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { postTrade, getTrades, getTradeAvaliations, getTrade, updateTradeStatus } from "@/controllers";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const tradesRouter = Router();

tradesRouter.post("/purchase", authenticateToken, validateBody(tradeSchema), postTrade);
tradesRouter.put("/complete/:tradeId", authenticateToken, updateTradeStatus);
tradesRouter.get("/:tradeType", authenticateToken, getTrades);
tradesRouter.get("/specific/:tradeId", authenticateToken, getTrade);
tradesRouter.get("/avaliations", authenticateToken, getTradeAvaliations);

export { tradesRouter };
