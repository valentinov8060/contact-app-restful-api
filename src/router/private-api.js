import express from 'express';

import {register, login, get} from '../controller/user-controller.js';
import {authMiddleware} from '../middleware/auth-middleware.js';

const privateRouter = new express.Router();

privateRouter.use(authMiddleware);
privateRouter.get('/get', get);

export {
    privateRouter
}