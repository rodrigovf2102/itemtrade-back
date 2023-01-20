import { defaultError } from "@/errors";
import { UserWithEmailAndToken, UserWithNoId } from "@/protocols";
import userRepository from "@/repositories/user-repository";
import sessionRepository from "@/repositories/session-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser({ email, password }: UserWithNoId): Promise<User> {
  await verifyEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.createUser({ email, password: hashedPassword });
}

async function verifyEmail(email: string) {
  const userWithEmail = await userRepository.findUserByEmail(email);
  if (userWithEmail) {
    throw defaultError("DuplicatedEmail");
  }
}

export async function signIn({ email, password }: UserWithNoId): Promise<UserWithEmailAndToken> {
  const user = await getUser(email);
  await validatePassword(password, user.password);
  const token = await createSession(user.id);
  const session = { email: user.email, token } as UserWithEmailAndToken;
  return session;
}

async function getUser(email: string): Promise<User> {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw defaultError("EmailNotFound");
  return user;
}

async function validatePassword(password: string, userPassword: string) {
  const passwordValid = await bcrypt.compare(password, userPassword);
  if (!passwordValid) throw defaultError("PasswordInvalid");
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  await sessionRepository.createSession({ token, userId });
  return token;
}

const userService = {
  createUser,
  signIn,
};

export default userService;
