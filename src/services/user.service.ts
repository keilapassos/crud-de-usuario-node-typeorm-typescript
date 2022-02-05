import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../entities";
import UserRepository from "../repositories/userRepository";
import bcrypt from 'bcrypt'


interface UserBody {
    name: string
    email: string,
    password: string,
    isAdm: boolean
}

export const createUser = async (body: UserBody) => {
    const password = await bcrypt.hash(body.password, 10);

    const { name, email, isAdm } = body;

    // const hashedPassword = await bcrypt.hash(password, 10);

    // password = hashedPassword
    
    
    const userRepository = getRepository(User);

    const user = userRepository.create({
        name,
        email,
        password,
        isAdm,
    });

    await userRepository.save(user);

    const { password: data_password, ...dataWithoutPassword } = user;

    return dataWithoutPassword;
}


export const listUser = async () => {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    let listWithoutPassword = []
    let eachUser = {}

    for (let i in users){
        eachUser = {
            uuid: users[i].uuid,
            name: users[i].name,
            email: users[i].email,
            isAdm: users[i].isAdm,
            createdOn: users[i].createdOn,
            updatedOn: users[i].updatedOn
        }
        listWithoutPassword.push(eachUser)
    }   

    return listWithoutPassword;
}

export const updateUser = async (uuidParams: string, reqUser: any, data: any) => {
    const userCustomRepository = getCustomRepository(UserRepository);

    const userFounded = await userCustomRepository.findByUuid(reqUser)

    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne(uuidParams)

    if (!userExists){
        return {message: "User not found"}
    }

    if (userFounded?.isAdm || userFounded?.uuid === uuidParams){ 

        return await userCustomRepository.save({
            ...userExists, ...data
        });
    }
}

export const deleteUser = async (uuidParams: string, reqUser: any, next:any) => {

    const userCustomRepository = getCustomRepository(UserRepository);

    const userFounded = await userCustomRepository.findByUuid(reqUser)

    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne(uuidParams)

    if (!userExists){
        return {message: "User not found"}
    }

    if (userFounded?.isAdm || userFounded?.uuid === uuidParams){ 

        await userCustomRepository.delete(uuidParams); 
        return {message: "User deleted with success"} 
    }
}

