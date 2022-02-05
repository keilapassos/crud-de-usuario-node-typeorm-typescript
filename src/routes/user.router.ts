import { Router } from "express";
import { create, list, currentUser, updating, deleting } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateUserSchema } from "../database/schemas";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";


const router = Router();

export const userRouter = () => {
    router.post('', validate(createUserSchema), create);
    router.get('', isAuthenticated, adminMiddleware, list);
    router.get('/profile', isAuthenticated, currentUser);
    router.patch('/:uuid', isAuthenticated, validate(updateUserSchema), updating);
    router.delete('/:uuid', isAuthenticated, deleting);

    return router;
}

