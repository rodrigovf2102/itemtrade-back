import { ServerWithNoId } from "@/protocols";
import Joi from "joi";

export const serverSchema = Joi.object<ServerWithNoId>({
  name: Joi.string().min(3).required(),
  gameId: Joi.number().required()
});



