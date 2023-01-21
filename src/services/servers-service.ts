import { defaultError } from "@/errors";
import { ServerWithNoId } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import serverRepository from "@/repositories/server-repository";
import { Server } from "@prisma/client";

export async function getServers(gameId:number): Promise<Server[]> {
  if(!gameId || isNaN(gameId)) throw defaultError("Invalid gameId");
  const servers = await serverRepository.findServersByGameId(gameId);
  return servers;
}

export async function postServer({name,gameId}: ServerWithNoId, userId:number) : Promise<Server>{
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!enrollment) throw defaultError("UserWithoutEnrollment");
  const server = await serverRepository.findServerByName(name);
  if(server){
    throw defaultError("GameAlreadyExist");
  }
  const createdServer = await serverRepository.postServer({name,gameId});
  return createdServer;
}

const serversService = {
  getServers,
  postServer
};

export default serversService;