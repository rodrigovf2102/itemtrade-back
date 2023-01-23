"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEnrollmentByUserId = exports.upsertEnrollment = void 0;
const config_1 = require("../config");
async function upsertEnrollment(newEnrollment, userId) {
    return config_1.prisma.enrollment.upsert({
        where: { userId },
        create: {
            enrollmentUrl: newEnrollment.enrollmentUrl,
            CPF: newEnrollment.CPF,
            name: newEnrollment.name,
            userId,
        },
        update: {
            enrollmentUrl: newEnrollment.enrollmentUrl,
            CPF: newEnrollment.CPF,
            name: newEnrollment.name,
            userId,
        },
    });
}
exports.upsertEnrollment = upsertEnrollment;
function findEnrollmentByUserId(userId) {
    return config_1.prisma.enrollment.findFirst({
        where: { userId },
    });
}
exports.findEnrollmentByUserId = findEnrollmentByUserId;
const enrollmentRepository = {
    upsertEnrollment,
    findEnrollmentByUserId,
};
exports.default = enrollmentRepository;
