import { Request, Response } from "express";
import { authenticateUser } from "../services/login.service";

// export const login = async (req: Request, res: Response) => {
//   // const { email, password } = req.body;
//   // const token = await authenticateUser(email, password);
//   const token = await authenticateUser(req.body);

//   res.send({ token });
// }


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await authenticateUser(email, password);

  return res.send( {token} );
}
