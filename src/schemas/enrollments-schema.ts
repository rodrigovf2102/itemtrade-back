import { UpsertEnrollment } from "@/protocols";
import Joi from "joi";

export const upsertEnrollmentSchema = Joi.object<UpsertEnrollment>({
  name: Joi.string().min(3).required(),
  CPF: Joi.string().min(11).max(11).required(),
  enrollmentUrl: Joi.string().pattern(new RegExp("^https://"))
});



