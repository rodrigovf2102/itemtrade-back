"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGame = exports.findGameByName = exports.findGames = void 0;
const config_1 = require("../config");
async function findGames() {
    return config_1.prisma.game.findMany({});
}
exports.findGames = findGames;
async function findGameByName(name) {
    return config_1.prisma.game.findFirst({
        where: { name },
    });
}
exports.findGameByName = findGameByName;
async function postGame({ name, gameUrl }) {
    return config_1.prisma.game.create({
        data: { name, gameUrl },
    });
}
exports.postGame = postGame;
const gameRepository = {
    findGames,
    postGame,
    findGameByName
};
exports.default = gameRepository;
