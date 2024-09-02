import express, { Request, Response } from 'express';
import { Application } from 'express';
import applicationInitialization from "./init/index"
import http from "http"
import logger from './utils/logger';
import config from "./config/env"
async function startServer() {
    try {
        const app: Application = await applicationInitialization();
        const server: http.Server = http.createServer(app);

        server.listen(config.PORT, () => {
            logger.info(`server started on ${config.PORT}`);
            logger.info(`server Url http://localhost:${config.PORT}`);
        });
        // MainService.getEvents();

        return server;
    } catch (error: any) {
        logger.error('Error occurred when starting server:::', error);
    }
}

export default startServer();
// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors());

// //limit number of request for api/ endpoint
// app.use('/api', rateLimiter);

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
