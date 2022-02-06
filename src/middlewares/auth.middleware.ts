import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
 
  const token = req.headers.authorization?.split(' ')[1];

    if (token === undefined) {
        return res.status(401).json({ message: "Missing authorization headers" });
    }    

    jwt.verify(token, process.env.SECRET as string, (err: any, decoded: any) => {
        if (err) {
           return res.status(401).json({ message: "Wrong authorization headers" });
        }

        const userId = decoded.uuid;
        
        req.user = userId;  
        next();
    });
}
