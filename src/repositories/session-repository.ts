import { prisma } from "@/config";
import { SessionWithNoId } from "@/protocols";

export async function createSession({ userId, token }: SessionWithNoId) {
  return prisma.session.create({ data: { userId, token } });
}

const sessionRepository = {
  createSession,
};

export default sessionRepository;
