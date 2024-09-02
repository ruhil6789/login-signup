import { Request, Response } from "express";
// import UserService from "./service";
import { RES_MSG, RESPONSES } from "../src/utils/response";
import bcrypt from "bcrypt";
import userModel from "./model";
import jwt from "jsonwebtoken";
import config from "../src/config/env"
import Joi from "joi";
import { ILoginUs } from "./interface";
import userProject from "./project.model";

class UserService {
    public register = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const hashPassword = bcrypt.hashSync(password, 8)
            const alreadyUser = await userModel.findOne({ email: email });
            if (alreadyUser) {
                return {
                    message: RES_MSG.REGISTER.ALREADY,
                    error: true,
                    data: "Already User",
                    status: RESPONSES.INVALID_REQ
                }
            }
            const newUser: any = {
                email: email,
                password: hashPassword,
                isConfirmed: false
            }
            const result = await userModel.create(newUser);
            if (result) {
                const token = jwt.sign({ email: newUser.email }, config.JWT_SECRET!, { expiresIn: '1d' });

                const confirmationLink = `${config.HOME_DOMAIN_URL}:${4000}/user/confirm-mail?token=${token}`;
                return res.status(RESPONSES.SUCCESS).json({
                    message: RES_MSG.REGISTER.SUCCESS,
                    error: false,
                    data: { result, confirmationLink },
                    status: RESPONSES.SUCCESS
                });
            }
        } catch (error) {
            return {
                message: RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true
            }
        }

    }


    public getAdminTrx = async (req: Request, res: Response) => {

        try {
            res.status(200).json({
                message: RES_MSG.ADMIN_VERIFIED,
                status: RESPONSES.SUCCESS,
                error: false
            });
        } catch (error) {
            return {
                message: RES_MSG.BADREQUEST,
                status: RESPONSES.BADREQUEST,
                error: true
            }
        }
    }
    public confirmMail = async (req: Request, res: Response) => {
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

            user.isConfirmed = true;
            await user.save();

            res.status(200).json({ message: 'Email confirmed successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token' });
        }
        ;
    }


    public login = async (req: Request, res: Response) => {
        try {
            const loginData: ILoginUs = req.body;

            const { email, password } = req.body;
            const schema = Joi.object({
                email: Joi.string().email({
                    minDomainSegments: 2,
                }),

                password: Joi.string().trim().required(),
            });
            const { error } = schema.validate({
                email: req.body.email,
                password: req.body.password,
            });
            if (error)
                throw {
                    message: error.details[0].message,
                    status: RESPONSES.INVALID_REQ,
                    error: true,
                };

            const jwtsecretkey = process.env.JWT_SECRET;
            const jwttimeout = process.env.JWT_TIME_OUT;
            const accessToken = jwt.sign(loginData, config.JWT_SECRET, {
                expiresIn: "5hr",
            });
            const result = await userModel.findOne({
                email: email,
            });
            if (result?.email) {
                bcrypt.compare(password, result?.password, (err, isMatch) => {
                    if (isMatch) {
                        return res.json({
                            message: RES_MSG.LOGIN.SUCCESS,
                            status: RESPONSES.SUCCESS,
                            data: {
                                email: result?.email,
                                token: accessToken,

                            },
                            error: false,
                        });
                    } else {
                        return res.json({
                            message: RES_MSG.LOGIN.INVALIDUSER,
                            status: RESPONSES?.BADREQUEST,
                            error: true,
                        });
                    }
                });
            } else {
                return res.json({
                    message: RES_MSG.LOGIN.INVALIDUSER,
                    status: RESPONSES?.BADREQUEST,
                    error: true,
                });
            }
        } catch (error) {
            console.log("MessageUtilerror", error);

            return res.json({
                message: RESPONSES.BADREQUEST,
                status: RESPONSES?.INVALID_REQ,
                error: true,
            });
        }
    };

    public userWorkTime = async (req: Request, res: Response) => {
        const { project, description } = req.body

        const schema = Joi.object({
            project: Joi.string().required(),
            description: Joi.string().trim().required(),
            startTime: Joi.number(),
            endTime: Joi.number(),
            totalTime: Joi.number()
        });


        const { error } = schema.validate(req.body);
        if (error)
            throw {
                message: error.details[0].message,
                status: RESPONSES.INVALID_REQ,
                error: true,
            };


        const userTime = await userProject.findOne({
            project: project,
        })
        if (!userTime) {
            return res.json({
                message: "Project not found",
                status: RESPONSES.NOTFOUND,
                error: true,
            })
        }



    }

    public addNewProject = async (req: Request, res: Response) => {
        try {
            const { project, description } = req.body;

            const schema = Joi.object({
                project: Joi.string().required(),
                description: Joi.string().required()
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(RESPONSES.INVALID_REQ).json({
                    message: error.details[0].message,
                    status: RESPONSES.INVALID_REQ,
                    error: true,
                });
            }

            const existProject = await userProject.findOne({ project: project });

            if (existProject) {
                return res.json({
                    message: "Project already exists",
                    status: RESPONSES.NOTFOUND,
                    error: true,
                });
            } else {
                const createProject = await userProject.create({
                    project: project,
                    description: description
                });

                if (createProject) {
                    return res.json({
                        message: "Created new Project",
                        status: RESPONSES.SUCCESS,
                        error: false,
                    });
                }
            }
        } catch (error) {
            return res.status(RESPONSES.INVALID_REQ).json({
                message: RESPONSES.BADREQUEST,
                status: RESPONSES.INVALID_REQ,
                error: true,
            });
        }
    }


    public getProjects = async (req: Request, res: Response) => {
        try {
            const { page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = req.body;

            const pageNumber = parseInt(page as string) || 1;
            const limitNumber = parseInt(limit as string) || 10; 
            const sortField = sortBy as string || 'createdAt'; 
            const sortOrder = order === 'desc' ? -1 : 1; 

            const skip = (pageNumber - 1) * limitNumber;

            const projects = await userProject
                .find()
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limitNumber);

            const totalProjects = await userProject.countDocuments();

            return res.json({
                message: "List of projects",
                status: RESPONSES.SUCCESS,
                error: false,
                data: {
                    projects,
                    pagination: {
                        totalProjects,
                        currentPage: pageNumber,
                        totalPages: Math.ceil(totalProjects / limitNumber),
                        limit: limitNumber,
                    },
                },
            });
        } catch (error) {
            return res.status(RESPONSES.INVALID_REQ).json({
                message: RESPONSES.BADREQUEST,
                status: RESPONSES.INVALID_REQ,
                error: true,
            });
        }
    }


}

export default new UserService();