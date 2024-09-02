// import { IUserService } from "./interface"
// import userModel from "./model"
// import bcrypt from "bcrypt";
// import { PromiseResolve } from "./interface";
// import { RES_MSG, RESPONSES } from "../src/utils/response";
// import jwt from "jsonwebtoken"

// const UserService: IUserService = {
//     /**
// * @param {IUserModel} register
// * @returns {Promise <PromiseResolve>}
// * @memberof UserService
// */
//     async register(email: string, password: string): Promise<PromiseResolve> {
//         try {
//             const hashPassword = bcrypt.hashSync(password, 8)
//             const alreadyUser = await userModel.findOne({ email: email });
//             console.log("already_user", alreadyUser);
//             if (alreadyUser) {
//                 return {
//                     message: RES_MSG.REGISTER.ALREADY,
//                     error: true,
//                     data: "Already User",
//                     status: RESPONSES.INVALID_REQ
//                 }
//             }
//             const newUser: any = {
//                 email: email,
//                 password: hashPassword,
//                 isConfirmed: false, // Email not confirmed yet
//             }
//             console.log("newUser", newUser);
//             // Generate a token for email confirmation
//             const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });

//             // Return a link for email confirmation
//             const confirmationLink = `${req.protocol}://${req.get('host')}/confirm-email?token=${token}`;

//             const result = await userModel.create(newUser);
//             if(result){
//                 return {
//                     message: RES_MSG.REGISTER.SUCCESS,
//                     error: false,
//                     data: {result,confirmationLink},
//                     status: RESPONSES.SUCCESS
//                 }
//             }
//         } catch (error) {
//             return {
//                 message: RES_MSG.BADREQUEST,
//                 status: RESPONSES.BADREQUEST,
//                 error: true
//             }
//         }

//     },
// }

// export default UserService;