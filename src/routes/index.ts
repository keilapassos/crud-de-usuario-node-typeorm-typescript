import { Express } from "express";
import { loginRouter } from "./login.router";
import { userRouter } from "./user.router";

export const routerApp = (app: Express) => {
  app.use("/users", userRouter())
  app.use("/login", loginRouter())
}