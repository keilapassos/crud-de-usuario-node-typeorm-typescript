import "reflect-metadata";
import express from 'express';
import { userRouter } from "./routes";
import { connectDatabase } from "./database";

connectDatabase();

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  res.send({ message: 'OK' });
});

app.use('/users', userRouter());

export default app;
