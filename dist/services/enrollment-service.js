"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertEnrollment = exports.getEnrollment = void 0;
const errors_1 = require("../errors");
const brazilian_utils_1 = require("@brazilian-utils/brazilian-utils");
const enrollment_repository_1 = __importDefault(require("../repositories/enrollment-repository"));
async function getEnrollment(userId) {
    const enrollment = await enrollment_repository_1.default.findEnrollmentByUserId(userId);
    if (!enrollment)
        throw (0, errors_1.defaultError)("EnrollmentNotFound");
    return enrollment;
}
exports.getEnrollment = getEnrollment;
async function upsertEnrollment(newEnrollment, userId) {
    if (!(0, brazilian_utils_1.isValidCPF)(newEnrollment.CPF))
        throw (0, errors_1.defaultError)("InvalidCPF");
    if (!newEnrollment.enrollmentUrl)
        newEnrollment.enrollmentUrl = "../assets/images/action.png";
    const enrollment = await enrollment_repository_1.default.upsertEnrollment(newEnrollment, userId);
    return enrollment;
}
exports.upsertEnrollment = upsertEnrollment;
const enrollmentService = {
    getEnrollment,
    upsertEnrollment
};
exports.default = enrollmentService;
