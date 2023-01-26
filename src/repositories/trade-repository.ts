import { prisma } from "@/config";
import { Trade } from "@prisma/client";

export async function postTradeByEnrollmentsIds(sellerEnrollmentId : number, buyerEnrollmentId : number, itemId : number) : Promise<Trade> {
  return prisma.trade.create({
    data: { sellerEnrollmentId, buyerEnrollmentId, itemId},
    include: { EnrollmentBuyer: true, EnrollmentSeller: true, Item: true}
  });
}

export async function findTradesByBuyerEnrollmentId(enrollmentId : number){
  return prisma.trade.findMany({
    where : { buyerEnrollmentId : enrollmentId}
  });
}

export async function findTradesBySellerEnrollmentId(enrollmentId : number){
  return prisma.trade.findMany({
    where : { sellerEnrollmentId : enrollmentId}
  });
}

const tradeRepository = {
  postTradeByEnrollmentsIds,
  findTradesByBuyerEnrollmentId,
  findTradesBySellerEnrollmentId
};

export default tradeRepository;