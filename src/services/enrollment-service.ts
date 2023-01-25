import { defaultError } from "@/errors";
import { UpsertEnrollment } from "@/protocols";
import { Enrollment } from "@prisma/client";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import enrollmentRepository from "@/repositories/enrollment-repository";

export async function getEnrollment(userId:number): Promise<Enrollment> {
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  if(!enrollment) throw defaultError("EnrollmentNotFound");
  return enrollment;
}

export async function upsertEnrollment(newEnrollment: UpsertEnrollment, userId:number): Promise<Enrollment>{
  if(!isValidCPF(newEnrollment.CPF)) throw defaultError("InvalidCPF");
  if(!newEnrollment.enrollmentUrl) newEnrollment.enrollmentUrl = "../assets/images/action.png";
  const enrollment = await enrollmentRepository.upsertEnrollment(newEnrollment,userId);
  return enrollment;
}

export async function updateEnrollmentBalance(balance:number, userId:number):Promise<Enrollment>{
  if(isNaN(balance)) throw defaultError("InvalidBalance");
  const enrollment = await enrollmentRepository.findEnrollmentByUserId(userId);
  balance = enrollment.balance + balance;
  const enrollmentUpdated = await enrollmentRepository.updateEnrollmentBalance(balance,enrollment.id);
  return enrollmentUpdated; 
}

const enrollmentService = {
  getEnrollment,
  upsertEnrollment,
  updateEnrollmentBalance
};

export default enrollmentService;