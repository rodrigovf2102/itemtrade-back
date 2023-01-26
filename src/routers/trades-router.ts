import { Router } from "express";
import { tradeSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { postTrade, getTrades, getTradeAvaliations } from "@/controllers";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const tradesRouter = Router();

tradesRouter.post("/purchase", authenticateToken, validateBody(tradeSchema), postTrade);
tradesRouter.get("/:tradeType", authenticateToken, getTrades);
tradesRouter.get("/avaliations", authenticateToken, getTradeAvaliations);

export { tradesRouter };
