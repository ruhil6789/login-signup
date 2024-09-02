import { boolean } from "joi";
import mongoose, { Schema } from "mongoose";

export interface IUserModel extends Document {
    email: string,
    password: string,
    role: string,
    project: string
    startAt: number
    endAt: number,
    totalTime: number,
    isConfirmed: boolean

}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,

    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },

    isConfirmed: {
        type: Boolean,
        require: false
    },


},
    {
        collection: 'userModel',
        versionKey: false,
    })

export default mongoose.model<IUserModel>('userModel', userSchema);
