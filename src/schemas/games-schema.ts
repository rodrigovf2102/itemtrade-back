import { GameWithNoId } from "@/protocols";
import Joi from "joi";

export const createGameSchema = Joi.object<GameWithNoId>({
  name: Joi.string().min(3).required(),
  gameUrl: Joi.string().pattern(new RegExp("^https://")).required()
});



