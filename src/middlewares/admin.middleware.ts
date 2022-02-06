import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/userRepository';


export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const uuid = req.user
  
  const userRepository = getCustomRepository(UserRepository);
    
  const userFounded = await userRepository.findOne({where: {
    uuid
  }});

  if (!userFounded?.isAdm){
    return res.status(401).send({message: "Unauthorized"})
  }
  next();
};