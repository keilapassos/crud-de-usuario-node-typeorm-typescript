import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../entities";

import UserRepository from '../repositories/userRepository';

interface UserBody {
    name: string
    email: string,
    password: string,
    isAdm: boolean
}

export const createUser = async (body: UserBody) => {
    const { name, email, password, isAdm } = body;

    const userRepository = getRepository(User);

    const user = userRepository.create({
        name,
        email,
        password,
        isAdm,
    });

    await userRepository.save(user);

    return user;
}

// export const currentUser = async (req: Request, res: Response) => {
//     const user = req.user;

//     res.send(user);
// }


// export const listUser = async (page = 1) => {
//     const userRepository = getCustomRepository(UserRepository);

//     const users = await userRepository.findPaginated(page);

//     return users;
// }
