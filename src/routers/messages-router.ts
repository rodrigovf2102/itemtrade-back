import { Router } from "express";
import { messagesSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { getTradeMessages, postMessage } from "@/controllers";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const messagesRouter = Router();

messagesRouter.get("/:tradeId", getTradeMessages);
messagesRouter.post("/:tradeId", validateBody(messagesSchema), authenticateToken, postMessage);

export { messagesRouter };
