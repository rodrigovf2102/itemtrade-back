import { Session, User, Game, Server, Item } from "@prisma/client";

export type UserWithNoId = Omit<User, "id">;

export type ApplicationError = {
    name: string;
    message: string;
};

export type UserWithEmailAndToken = {
    email: string,
    token: string
};

export type UserWithEmailTokenAndId = {
    email: string,
    token: string,
    id: number
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

export type ServerWithNoId = Omit<Server, "id">;

export type ServerNoIdName = {
    name: string,
    gameName: string
}

export type ItemWithNoId = Omit<Item, "id">

export type ItemWithNoIdNoEnrollId = Omit<Item,"id"|"enrollmentId">