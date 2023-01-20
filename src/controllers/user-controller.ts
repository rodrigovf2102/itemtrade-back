import { UserWithNoId } from "@/protocols";
import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.detail === "DuplicatedEmail") {
      return res.status(httpStatus.CONFLICT).send(error.detail);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function signInPost(req: Request, res: Response) {
  const { email, password } = req.body as UserWithNoId;

  try {
    const result = await userService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.detail === "PasswordInvalid") {
      return res.status(httpStatus.UNAUTHORIZED).send("InvalidCredentials");
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
