import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import gamesService from "@/services/games-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getGames(req: Request, res: Response) {
  try {
    const games = await gamesService.getGames();
    return res.status(httpStatus.OK).send(games);
  } catch (error) {
    if (error.detail === "GamesNotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.detail);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function postGame(req: AuthenticatedRequest, res: Response) {
  const { name, gameUrl } = req.body;
  try {
    const game = await gamesService.postGame({ name, gameUrl });
    return res.status(httpStatus.CREATED).send(game);
  } catch (error) {
    if (error.detail === "GamesAlreadyExist") {
      return res.status(httpStatus.CONFLICT).send(error.detail);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
