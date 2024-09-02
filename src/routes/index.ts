import { Router } from 'express';
// import admin from './admin';
// import user from './user';
// import domainValidator from '../middleware/domainValidator';
import allRoutes from"./allRoutes";

const route: any = Router();
route.use('/user', allRoutes);
// route.use('/user', [domainValidator], user);


export default route;
