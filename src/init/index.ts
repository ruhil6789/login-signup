import { Application } from 'express';
import express from 'express';
import expressLoader from './express';
import mongooseLoader from './databaseConnection';
import logger from '../utils/logger';

export default async (): Promise<Application> => {
    try {
        const app = express();
        await mongooseLoader();
        logger.info('Database started');
        const application: Application = await expressLoader({ app: app });
        logger.info('Express Intialized');

        //We can start other process here like rabbitmq , cronJobs and other services

        return application;
    } catch (error: any) {
        logger.error(`Application initialization failed ${error.stack}`);
        throw error;
    }
};
