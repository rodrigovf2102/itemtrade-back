import { ItemWithNoId } from "@/protocols";
import Joi from "joi";

export const itemSchema = Joi.object<ItemWithNoId>({
  name: Joi.string().min(4).max(70).required(),
  price: Joi.number().required(),
  amount: Joi.number().required(),
  itemUrl: Joi.string().pattern(new RegExp("^https://")).required(),
  serverId : Joi.number().required(),
  enrollmentId : Joi.number().required(),
  itemType : Joi.any().allow("Dinheiro","Equipamento","Recurso","Utilizáveis","Outros","Todas"),
});



