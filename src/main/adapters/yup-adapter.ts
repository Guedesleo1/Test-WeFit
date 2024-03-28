import { NextFunction, Request, Response } from "express";
import * as yup from 'yup'; 
export class YupAdapter {
    static adapt(schema: yup.ObjectSchema<any>): any {
        return async (request: Request, response: Response,  next: NextFunction) => {
            try {
                await schema.validate(request.body, { abortEarly: false });
                next();
            } catch (error:any) {
                return response.status(400).json({ message: error.errors });
            }
        };
    }
}