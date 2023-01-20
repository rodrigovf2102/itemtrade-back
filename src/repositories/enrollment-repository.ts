import { prisma } from "@/config";
import { UpsertEnrollment } from "@/protocols";
import { Enrollment } from "@prisma/client";

export async function upsertEnrollment(newEnrollment: UpsertEnrollment, userId: number): Promise<Enrollment> {
  return prisma.enrollment.upsert({
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

export function findEnrollmentByUserId(userId: number): Promise<Enrollment> {
  return prisma.enrollment.findFirst({
    where: { userId },
  });
}

const enrollmentRepository = {
  upsertEnrollment,
  findEnrollmentByUserId,
};

export default enrollmentRepository;
