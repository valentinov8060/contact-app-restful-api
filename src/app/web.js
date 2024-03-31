import express from 'express';

import { publicRouter } from '../router/public-api.js';
import { privateRouter } from '../router/private-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';

const app = express();

// mem-parse body permintaan HTTP yang berformat JSON ke dalam objek dan tersedia pada properti req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', publicRouter)
app.use('/api', privateRouter)

app.use(errorMiddleware)

export { 
    app 
}