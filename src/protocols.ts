import { Session, User, Game } from "@prisma/client";

export type UserWithNoId = Omit<User, "id">;

export type ApplicationError = {
    name: string;
    message: string;
};

export type UserWithEmailAndToken = {
    email: string,
    token: string
};

export type UserWithIdAndToken = {
    id: number,
    token: string
};

export type SessionWithNoId = Omit<Session, "id">;

export type GameWithNoId = Omit<Game, "id">;

export type UpsertEnrollment = {
    name: string,
    CPF: string,
    enrollmentUrl?: string
};