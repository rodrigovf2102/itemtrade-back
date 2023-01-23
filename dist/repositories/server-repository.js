"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postServer = exports.findServerByName = exports.findServersByGameId = void 0;
const config_1 = require("../config");
async function findServersByGameId(gameId) {
    return config_1.prisma.server.findMany({
        where: { gameId }
    });
}
exports.findServersByGameId = findServersByGameId;
async function findServerByName(name) {
    return config_1.prisma.server.findFirst({
        where: { name },
    });
}
exports.findServerByName = findServerByName;
async function postServer({ name, gameId }) {
    return config_1.prisma.server.create({
        data: { name, gameId },
    });
}
exports.postServer = postServer;
const serverRepository = {
    findServersByGameId,
    postServer,
    findServerByName
};
exports.default = serverRepository;
