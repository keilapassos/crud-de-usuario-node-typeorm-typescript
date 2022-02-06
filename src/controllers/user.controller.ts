import { Request, Response, NextFunction } from "express";
import { createUser, listUser, updateUser, deleteUser } from "../services/user.service"
import { getRepository } from "typeorm";
import { User } from "../entities";
import bcrypt from 'bcrypt'


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        return res.status(201).send(user);
    } catch (err) {
        return res.status(400).send({message: "E-mail already registered"});
    }   
}

export const list = async (req: Request, res: Response) => {
    const users = await listUser();

    res.send(users);
}

export const currentUser = async (req: Request, res: Response) => {
    const uuid = req.user;

    const userRepository = getRepository(User);

    const userProfile = await userRepository.findOne({
        where: {
            uuid
        }
    })

    const userWithoutPassword = {
        uuid: userProfile?.uuid,
        name: userProfile?.name,
        email: userProfile?.email,
        isAdm: userProfile?.isAdm,
        createdOn: userProfile?.createdOn,
        updatedOn: userProfile?.updatedOn
    }

    return res.send(userWithoutPassword);
}

export const updating = async (req: Request, res: Response) => {
    const uuid = req.user
    const uuidParams = req.params.uuid

    if (req.body?.password){
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    let updated = await updateUser(uuidParams, uuid, req.body);
        
    if(updated?.message === 'User not found'){
        return res.status(404).send(updated);
    }


    if (updated){
        const userWithoutPassword = {
            uuid: updated.uuid,
            name: updated?.name,
            email: updated?.email,
            isAdm: updated?.isAdm,
            createdOn: updated?.createdOn,
            updatedOn: updated?.updatedOn
        }
    
        return res.send(userWithoutPassword);
    }

    return res.status(401).send({message: "Missing admin permissions"})       
}

export const deleting = async (req: Request, res: Response, next: NextFunction) => {
    const uuid = req.user
    const uuidParams = req.params.uuid

    let deleted = await deleteUser(uuidParams, uuid, next);

    if(deleted?.message === 'User deleted with success'){
        return res.status(200).send(deleted);
    }

    if(deleted?.message === 'User not found'){
        return res.status(404).send(deleted);
    }

    return res.status(401).send({message: "Missing admin permissions"})
}

