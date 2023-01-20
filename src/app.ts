import express, { Express } from "express";
import cors from "cors";
import { connectPostgresDb, loadEnv } from "@/config";
import { usersRouter } from "./routers";

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

export function start(): Promise<Express> {
  connectPostgresDb();
  return Promise.resolve(app);
}

export default app;
