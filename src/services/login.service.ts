import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getCustomRepository, getRepository } from "typeorm"
import { User } from '../entities';
import UserRepository from "../repositories/userRepository"


export const authenticateUser = async (email: string, password: any) => {
  // const userRepository = getCustomRepository(UserRepository);

  // const user = await userRepository.findByEmail(email);

  // if (user && bcrypt.compareSync(password, user.password)) {
  //   const token = jwt.sign({ uuid: user.uuid, isAdm: user.isAdm }, process.env.SECRET as string, { expiresIn: process.env.EXPIRESIN });

  //   return token;
  // }

  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findByEmail(email);

  // ERRO: se uso bcrypt compare recebo false
  // mas se uso !bcrypt compare recebo true e gera o token???
    
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ uuid: user.uuid, isAdm: user.isAdm }, process.env.SECRET as string, { expiresIn: process.env.EXPIRESIN });
    console.log("=========user && bcrypt============")
    return {token}; 
    // AQUI RETORNA FALSE (sendo que está CERTO)
  }


  if (user && !bcrypt.compareSync(password, user.password)){
    const token = jwt.sign({ uuid: user.uuid, isAdm: user.isAdm }, process.env.SECRET as string, { expiresIn: process.env.EXPIRESIN });
    console.log("=========user && NAO bcrypt============")
    return {token};
    // AQUI RETORNA TRUE (sendo que está ERRADO)
  }  
  
}
