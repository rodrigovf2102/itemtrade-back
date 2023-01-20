import express, { Express } from "express";
import cors from "cors";
import { connectPostgresDb, loadEnv } from "@/config";
import { usersRouter, gamesRouter, enrollmentRouter, serversRouter } from "@/routers";

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/games", gamesRouter);
app.use("/servers", serversRouter);

export function start(): Promise<Express> {
  connectPostgresDb();
  return Promise.resolve(app);
}

export default app;
