"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const config_1 = require("../config");
async function createSession({ userId, token }) {
    return config_1.prisma.session.create({ data: { userId, token } });
}
exports.createSession = createSession;
const sessionRepository = {
    createSession,
};
exports.default = sessionRepository;
