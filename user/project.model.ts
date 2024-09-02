import { boolean } from "joi";
import mongoose, { Schema } from "mongoose";

export interface IUserProject extends Document {

    project: string
    startAt: number
    endAt: number,
    totalTime: number,

}

const userSchema: Schema = new Schema({

    project: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },

    startAt: { type: Date, default: Date.now, require: false },
    endAt: { type: Date, default: Date.now, require: false },
    totalTime: { type: Date, default: Date.now, require: false },

},
    {
        collection: 'userProject',
        versionKey: false,
    })

export default mongoose.model<IUserProject>('userProject', userSchema);
