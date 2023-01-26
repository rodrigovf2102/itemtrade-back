import { AuthenticatedRequest } from "@/middlewares";
import tradeService from "@/services/trades-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postTrade(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { sellerEnrollmentId, itemId } = req.body;
  try {
    const trade = await tradeService.postTrade(sellerEnrollmentId, userId, itemId);
    return res.status(httpStatus.CREATED).send(trade);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getTrades(req: AuthenticatedRequest, res: Response){
  const { userId } = req;
  const tradeType = req.params.tradeType;
  try {
    const trades = await tradeService.getTrades(userId, tradeType);
    return res.status(httpStatus.OK).send(trades);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}