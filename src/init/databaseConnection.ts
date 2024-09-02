import mongoose from 'mongoose';
// import config from '../config/env';
import { log } from 'console';
import config from "../config/env"

const MONGO_URI: string = `${config.MONGO_DB_URL}${config.MONGODB_DB_MAIN}`;
console.log(MONGO_URI, "uri")
export default async (): Promise<any> => {
    const options: any = {
        authSource: 'admin',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 5000,
        socketTimeoutMS: 20000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        w: 'majority',
    };
    const db = await mongoose.connect(MONGO_URI, options);
    return db;
};
