import { AuthenticatedRequest } from "@/middlewares/authentication-middleware";
import { ItemWithNoId } from "@/protocols";
import itemsService from "@/services/items-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getItems(req: Request, res: Response) {
  try {
    const itemType = req.params.filtro;
    const serverId = Number(req.params.serverId);
    const items = await itemsService.getItems(serverId,itemType);
    return res.status(httpStatus.OK).send(items);
  } catch (error) {
    if (error.detail === "ItemsNotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.detail);
    }
    if (error.detail === "ServerNotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.detail);
    }
    if (error.detail === "ItemTypeNotFound") {
      return res.status(httpStatus.NOT_FOUND).send(error.detail);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function postItem(req: AuthenticatedRequest, res: Response) {
  const newItem = req.body as ItemWithNoId;
  try {
    const item = await itemsService.postItem(newItem);
    return res.status(httpStatus.CREATED).send(item);
  } catch (error) {
    if (error.detail === "ItemAlreadyExist") {
      return res.status(httpStatus.CONFLICT).send(error.detail);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
