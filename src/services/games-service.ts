import { defaultError } from "@/errors";
import { GameWithNoId } from "@/protocols";
import gameRepository from "@/repositories/game-repository";
import { Game } from "@prisma/client";

export async function getGames(): Promise<Game[]> {
  const games = await gameRepository.findGames();
  return games;
}

export async function postGame({name,gameUrl}: GameWithNoId) : Promise<Game>{
  const game = await gameRepository.findGameByName(name);
  if(game){
    throw defaultError("GameAlreadyExist");
  }
  const createdGame = await gameRepository.postGame({name,gameUrl});
  return createdGame;
}

const gamesService = {
  getGames,
  postGame
};

export default gamesService;