import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan'

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import zooRouter from './routes/zooRoutes.js';
import animalRouter from './routes/animalRoutes.js';
import { rateLimiter } from './middleware/rateLimit.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('tiny'));

let specs;
try {
    specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf-8'));
} catch (error){
    console.log('Failed to load OpenAPI specs: ', error);
    process.exit(1);
}

app.use(rateLimiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/zoo', zooRouter);
app.use('/api/animal', animalRouter);
// app.use('/api/review');

app.get('/health', (req, res) => {
    res.status(200).json({status: 'ok'});
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({
        error: err.message || 'Internal Server Error',
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});