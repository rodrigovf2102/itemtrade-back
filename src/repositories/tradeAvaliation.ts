import { prisma } from "@/config";
import { OPERATIONTYPE, TradeAvaliation } from "@prisma/client";

export async function postTradeAvaliation(tradeType: OPERATIONTYPE, enrollmentId : number) : Promise<TradeAvaliation> {
  return prisma.tradeAvaliation.create({
    data: { tradeType, enrollmentId }
  });
}

const tradeAvaliationRepository = {
  postTradeAvaliation
};

export default tradeAvaliationRepository;