import express from 'express';

import {register} from '../controller/user-controller.js';

const router = new express.Router();
router.post('/api/users', register);

export {
    router
}