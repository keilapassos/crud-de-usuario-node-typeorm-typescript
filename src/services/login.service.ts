import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository, getRepository } from "typeorm"
import { User } from '../entities';
import UserRepository from "../repositories/userRepository"


export const authenticateUser = async (email: string, password: string) => {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);
  
  if (user === undefined || !bcrypt.compareSync(password, user.password)) {
      return undefined;
  }

  const token = jwt.sign({ uuid: user.uuid, isAdm: user.isAdm }, process.env.SECRET as string, { expiresIn: process.env.EXPIRESIN });

  return token;
}
