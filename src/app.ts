import express, { Express } from "express";
import cors from "cors";
import { connectPostgresDb, loadEnv } from "@/config";
import { usersRouter, gamesRouter, enrollmentRouter, serversRouter, itemsRouter, paymentRouter } from "@/routers";

loadEnv();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/games", gamesRouter);
app.use("/servers", serversRouter);
app.use("/items", itemsRouter);
app.use("/payments", paymentRouter);

export function start(): Promise<Express> {
  connectPostgresDb();
  return Promise.resolve(app);
}

export default app;
