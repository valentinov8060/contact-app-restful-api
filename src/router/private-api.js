import express from 'express';

import {register, login, get, update, logout} from '../controller/user-controller.js';
import {authMiddleware} from '../middleware/auth-middleware.js';

const privateRouter = new express.Router();

privateRouter.use(authMiddleware);
privateRouter.get('/get', get);
privateRouter.patch('/update', update);
privateRouter.delete('/logout', logout);

export {
    privateRouter
}