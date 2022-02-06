import { Request, Response } from "express";
import { authenticateUser } from "../services/login.service";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const token = await authenticateUser(email, password);

  if (token){
    console.log(token)
    return res.send(token);
  }    
  return res.status(401).send({message: "Wrong email/password"})
}
