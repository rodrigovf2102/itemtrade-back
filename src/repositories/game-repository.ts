import { prisma } from "@/config";
import { GameWithNoId } from "@/protocols";
import { Game } from "@prisma/client";

export async function findGames(): Promise<Game[]> {
  return prisma.game.findMany({});
}

export async function findGameByName(name: string): Promise<Game> {
  return prisma.game.findFirst({
    where: { name },
  });
}

export async function postGame({ name, gameUrl }: GameWithNoId) {
  return prisma.game.create({
    data: { name, gameUrl },
  });
}

const gameRepository = {
  findGames,
  postGame,
  findGameByName
};

export default gameRepository;
