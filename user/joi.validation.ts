import Joi from "joi";
import { RES_MSG, RESPONSES } from "../src/utils/response";
export const joiRegister = async (email: string, password: string) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email({
                minDomainSegments: 2,
            }),
            password: Joi.string().trim().required(),
            // role: Joi.string().trim().required(),
        });


        const request = {
            email,
            password,
            // role,
        }

        const validationSchema = await schema.validate(request)
        if (validationSchema?.error) {
            return {
                message: validationSchema.error.message,
                status: RESPONSES.BADREQUEST,
                error: true,
            };
        }

        if (validationSchema?.value) {
            return {
                email: validationSchema.value.email,
                password: validationSchema.value.password,
                status: RESPONSES.SUCCESS
            };
        }
    } catch (error) {
        return {
            message: RES_MSG.BADREQUEST,
            status: RESPONSES.BADREQUEST,
            error: true,
        };
    }

}