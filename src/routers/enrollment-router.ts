import { Router } from "express";
import { upsertEnrollmentSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { getEnrollment, upsertEnrollment } from "@/controllers";
import { authenticateToken } from "@/middlewares/authentication-middleware";

const enrollmentRouter = Router();

enrollmentRouter.get("/", authenticateToken , getEnrollment);
enrollmentRouter.post("/", validateBody(upsertEnrollmentSchema), authenticateToken, upsertEnrollment);

export { enrollmentRouter };
