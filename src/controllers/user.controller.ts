import { Request, Response, NextFunction } from "express";
import { createUser, listUser } from "../services/user.service"

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (error) {
        return next(error);
    }
}

export const list = async (req: Request, res: Response) => {
    const users = await listUser();

    res.send(users);
}

// export const currentUser = async (req: Request, res: Response) => {
//     const user = req.user;

//     res.send(user);
// }
