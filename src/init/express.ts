import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import config from '../config/env';
import appRoute from "../routes/index"
import rateLimiter from '../utils/rateLimiter';



export default async ({ app }: { app: Application }) => {
    app.use(express.json({ limit: '5mb' }));
    app.use(express.urlencoded({ extended: true }));


    app.use(cors());
    // app.use(helmet(config.helmetConfig));

    //limit number of request for api/ endpoint
    app.use('/api', rateLimiter);

    // set view engine and its path
    const viewpath = path.join(__dirname, '..', 'public', 'html');
    app.set('views', viewpath);
    app.set('view engine', 'ejs');

    // serve static file
    const staticfile = path.join(__dirname, '..', 'public');
    app.use('/static', express.static(staticfile));


    // app.get('/', (req, res) => {
    //     const html = `<h1>${config.WEBSITE_NAME}</h1>
    //             <a href=${config.SWAGGER_LINK}>Click to visit documentation page</a>
    // `;
    //     res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    //     res.send(html);
    // });

    app.use('/', [rateLimiter], appRoute);


    return app;
};
