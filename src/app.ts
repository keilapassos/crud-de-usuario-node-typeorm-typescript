import "reflect-metadata";
import express from 'express';
import { connectDatabase } from "./database";
import { routerApp } from "./routes"
connectDatabase();

const app = express();

app.use(express.json());

routerApp(app)

export default app;
