import { NextFunction, Request, Response } from "express";
import { joiRegister } from "./joi.validation";
import { RES_MSG, RESPONSES } from "../src/utils/response";
import config from "../src/config/env";
import jwt from "jsonwebtoken";
import userModel from "./model"

declare module 'express-serve-static-core' {
    interface Request {
        validatedData?: any;
    }
}
// class Middleware {

//     validation = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const validate = await joiRegister(req.body.email, req.body.password)
//             if (!validate) {
//                 return res.status(RESPONSES.BADREQUEST).send({
//                     message: RES_MSG.USER.NOT_EXIST,
//                     error: false,
//                     status: RESPONSES.BADREQUEST,
//                 });
//             }

//             req.validatedData = validate.email;
//             req.validatedData = validate.password;

//             next();
//         } catch (error) {
//             return res.status(RESPONSES.BADREQUEST).send({
//                 message: RES_MSG.USER.NOT_EXIST,
//                 error: false,
//                 status: RESPONSES.BADREQUEST,
//             });
//         }

//     }
// }
export const isAuth = async (req: any, res: Response, next: NextFunction) => {
    const token = req.query.token;
    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload;
        const userEmail = decoded.email;
        const user = await userModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.userData = user;
        user.isConfirmed = true;
        await user.save();

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
}

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userData = req.userData;
        if (userData.email == config.Confirm_mail) {
            next();
        } else {
            res.status(200).json({ message: 'Admin verification failed' });
        }
    } catch (error) {

    }
}
// export default Middleware