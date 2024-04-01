import express from 'express';

// user API
import userController from '../controller/user-controller.js';
// contact API
import contactController from '../controller/contact-controller.js';
// address API
import addressController from '../controller/address-controller.js';
import {authMiddleware} from '../middleware/auth-middleware.js';

const privateRouter = new express.Router();

privateRouter.use(authMiddleware);
// user API
privateRouter.get('/user/get', userController.get);
privateRouter.patch('/user/update', userController.update);
privateRouter.delete('/user/logout', userController.logout);
// contact API
privateRouter.post('/contact/create', contactController.create);
privateRouter.get('/contact/get/:id_contact', contactController.get);
privateRouter.put('/contact/update/:id_contact', contactController.update);
privateRouter.delete('/contact/remove/:id_contact', contactController.remove);
privateRouter.get('/contact/search', contactController.search);
// address API
privateRouter.post('/contact/:id_contact/address/create', addressController.create);
privateRouter.get('/contact/:id_contact/address/get/:id_address', addressController.get);
privateRouter.put('/contact/:id_contact/address/update/:id_address', addressController.update);
privateRouter.delete('/contact/:id_contact/address/remove/:id_address', addressController.remove);
privateRouter.get('/contact/:id_contact/address/list', addressController.list);

export {
    privateRouter
}