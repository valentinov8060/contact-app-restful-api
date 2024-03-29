import express from 'express';

import {register, login} from '../controller/user-controller.js';

const publicRouter = new express.Router();

publicRouter.post('/register', register);
publicRouter.post('/login', login);

export {
    publicRouter
}