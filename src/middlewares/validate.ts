import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';


export const validate = (schema: yup.AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
        await schema.validate(body, { abortEarly: false, stripUnknown: true });
        next();
    } catch (e) {
        return res.status(400).send({ [(e as any).name]: (e as any).errors });
    }
}
