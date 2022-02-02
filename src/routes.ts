import { Router } from "express";
import { create } from "./controllers/user.controller";
import { validate } from "./middlewares/validate";
import { createUserSchema } from "./database/schemas";

const router = Router();

export const userRouter = () => {
    router.post('', validate(createUserSchema), create);
    // router.post('', update);
    // router.post('', deleting);

    return router;
}