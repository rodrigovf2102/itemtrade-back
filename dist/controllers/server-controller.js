"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServer = exports.getServers = void 0;
const servers_service_1 = __importDefault(require("../services/servers-service"));
const http_status_1 = __importDefault(require("http-status"));
async function getServers(req, res) {
    try {
        const gameId = Number(req.params.gameId);
        const servers = await servers_service_1.default.getServers(gameId);
        return res.status(http_status_1.default.OK).send(servers);
    }
    catch (error) {
        if (error.detail === "ServersNotFound") {
            return res.status(http_status_1.default.NOT_FOUND).send(error.detail);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.getServers = getServers;
async function postServer(req, res) {
    const { userId } = req;
    const { name, gameId } = req.body;
    try {
        const server = await servers_service_1.default.postServer({ name, gameId }, userId);
        return res.status(http_status_1.default.CREATED).send(server);
    }
    catch (error) {
        if (error.detail === "ServerAlreadyExist") {
            return res.status(http_status_1.default.CONFLICT).send(error.detail);
        }
        if (error.detail === "UserWithoutEnrollment") {
            return res.status(http_status_1.default.CONFLICT).send(error.detail);
        }
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.postServer = postServer;
