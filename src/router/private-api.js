import express from 'express';

// user API
import {register, login, get, update, logout} from '../controller/user-controller.js';
// contact API
import contactController from '../controller/contact-controller.js';
import {authMiddleware} from '../middleware/auth-middleware.js';

const privateRouter = new express.Router();

privateRouter.use(authMiddleware);
// user API
privateRouter.get('/user/get', get);
privateRouter.patch('/user/update', update);
privateRouter.delete('/user/logout', logout);
// contact API
privateRouter.post('/contact/create', contactController.create);
privateRouter.get('/contact/get/:id_contact', contactController.get);
privateRouter.put('/contact/update/:id_contact', contactController.update);
privateRouter.delete('/contact/remove/:id_contact', contactController.remove);
privateRouter.get('/contact/search', contactController.search);

export {
    privateRouter
}