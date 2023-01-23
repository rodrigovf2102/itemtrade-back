"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServer = exports.getServers = void 0;
const errors_1 = require("../errors");
const enrollment_repository_1 = __importDefault(require("../repositories/enrollment-repository"));
const server_repository_1 = __importDefault(require("../repositories/server-repository"));
async function getServers(gameId) {
    if (!gameId || isNaN(gameId))
        throw (0, errors_1.defaultError)("Invalid gameId");
    const servers = await server_repository_1.default.findServersByGameId(gameId);
    return servers;
}
exports.getServers = getServers;
async function postServer({ name, gameId }, userId) {
    const enrollment = await enrollment_repository_1.default.findEnrollmentByUserId(userId);
    if (!enrollment)
        throw (0, errors_1.defaultError)("UserWithoutEnrollment");
    const server = await server_repository_1.default.findServerByName(name);
    if (server) {
        throw (0, errors_1.defaultError)("GameAlreadyExist");
    }
    const createdServer = await server_repository_1.default.postServer({ name, gameId });
    return createdServer;
}
exports.postServer = postServer;
const serversService = {
    getServers,
    postServer
};
exports.default = serversService;
