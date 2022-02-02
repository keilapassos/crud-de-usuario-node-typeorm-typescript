import { Request, Response, NextFunction } from "express";
import { createUser } from "../services/user.service"

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (error) {
        return next(error);
    }


}

// export const list = async (req: Request, res: Response) => {
//     const pageQuery = req.query.page ? parseInt(req.query.page as string) : 1;
//     const users = await listUser(pageQuery);

//     res.send(users);
// }

// export const currentUser = async (req: Request, res: Response) => {
//     const user = req.user;

//     res.send(user);
// }
