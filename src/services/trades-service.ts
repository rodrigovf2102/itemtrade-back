import { defaultError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import itemRepository from "@/repositories/item-repository";
import tradeRepository from "@/repositories/trade-repository";
import tradeAvaliationRepository from "@/repositories/tradeAvaliation";
import { OPERATIONTYPE, Trade, TradeAvaliation } from "@prisma/client";

export async function postTrade(sellerEnrollmentId: number, userId: number, itemId: number): Promise<Trade> {
  const buyerEnrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!buyerEnrollment) throw defaultError("UserEnrollmentNotFound");
  const item = await itemRepository.findItemsById(itemId);
  if (!item) throw defaultError("ItemNotFound");

  const tradeTypeBuyer: OPERATIONTYPE = OPERATIONTYPE.PURCHASE;
  const tradeTypeSeller: OPERATIONTYPE = OPERATIONTYPE.SALE;

  await tradeAvaliationRepository.postTradeAvaliation(tradeTypeBuyer, buyerEnrollment.id);
  await tradeAvaliationRepository.postTradeAvaliation(tradeTypeSeller, sellerEnrollmentId);

  const trade = await tradeRepository.postTradeByEnrollmentsIds(sellerEnrollmentId, buyerEnrollment.id, itemId);
  return trade;
}

export async function getTrades(userId: number, tradeType: string): Promise<Trade[]> {
  if (tradeType !== OPERATIONTYPE.PURCHASE && tradeType !== OPERATIONTYPE.SALE) {
    throw defaultError("InvalidTradeType");
  }
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw defaultError("UserEnrollmentNotFound");
  let trades;
  if (tradeType === OPERATIONTYPE.PURCHASE) {
    trades = tradeRepository.findTradesByBuyerEnrollmentId(enrollment.id);
    return trades;
  }
  trades = tradeRepository.findTradesBySellerEnrollmentId(enrollment.id);
  return trades;
}

export async function getTradeAvaliations(userId:number) : Promise<TradeAvaliation[]>{
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollment) throw defaultError("UserEnrollmentNotFound");

  const tradeAvaliations = await tradeAvaliationRepository.getTradeAvaliations(enrollment.id);
  return tradeAvaliations;
}

const tradeService = {
  postTrade,
  getTrades,
  getTradeAvaliations
};

export default tradeService;
