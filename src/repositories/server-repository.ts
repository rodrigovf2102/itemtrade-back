import { prisma } from "@/config";
import { ServerWithNoId } from "@/protocols";
import { Server } from "@prisma/client";

export async function findServersByGameId(gameId : number): Promise<Server[]> {
  return prisma.server.findMany({
    where: { gameId }
  });
}

export async function findServerByName(name: string): Promise<Server> {
  return prisma.server.findFirst({
    where: { name },
  });
}

export async function postServer({ name, gameId }: ServerWithNoId) : Promise<Server>{
  return prisma.server.create({
    data: { name, gameId },
  });
}

const serverRepository = {
  findServersByGameId,
  postServer,
  findServerByName
};

export default serverRepository;
