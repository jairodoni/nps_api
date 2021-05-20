import { router } from "./routes";
import "./database";
import express from "express";
import cors from "cors";
import createConnection from "./database";

import "reflect-metadata";
import "dotenv/config";

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export { app };
