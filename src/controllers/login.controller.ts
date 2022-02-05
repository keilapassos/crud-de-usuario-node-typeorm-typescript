import { Request, Response } from "express";
import { authenticateUser } from "../services/login.service";

// export const login = async (req: Request, res: Response) => {
//   // const { email, password } = req.body;
//   // const token = await authenticateUser(email, password);
//   const token = await authenticateUser(req.body);

//   res.send({ token });
// }


export const login = async (req: Request, res: Response) => {
  // const { email, password } = req.body;
  
  // const token = await authenticateUser(email, password);

  // if (token){
  //   console.log("aqui=========")
  //   console.log(token)
  //   return res.send(token);
  // }    

  // console.log("aqui========= 2")
  // return res.status(401).send({message: "Wrong email/password"})
  // return res.status(401)

  const { email, password } = req.body;

  const token = await authenticateUser(email, password);

  // console.log("aqui========= 1")
  // if (typeof(token?.message) !== undefined){    
  //   console.log(token)
  //   return res.send(token);
  // }  
  if (!token){
    return res.status(401).send({message: "Wrong email/password"})
  }
  return res.send(token);
}
