import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository, getRepository } from "typeorm"
import UserRepository from "../repositories/userRepository"


export const authenticateUser = async (email: string, password: any) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);
  
  if (user && await bcrypt.compare(password, user.password)){
    const token = jwt.sign({ uuid: user?.uuid, isAdm: user?.isAdm }, process.env.SECRET as string, { expiresIn: process.env.EXPIRESIN });
    return {token};
  }
}
