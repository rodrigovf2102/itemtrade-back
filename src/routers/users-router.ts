import { Router } from "express";
import { createUserSchema, signInSchema } from "@/schemas";
import { validateBody } from "@/middlewares";
import { usersPost, signInPost } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/signup", validateBody(createUserSchema), usersPost);
usersRouter.post("/signin", validateBody(signInSchema), signInPost);

export { usersRouter };
