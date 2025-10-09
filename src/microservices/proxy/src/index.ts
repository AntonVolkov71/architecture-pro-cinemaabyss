'use strict';

import express from 'express';
import exampleRouter from './routes';
import Config from "./config";

const app = express();

const port = Config.portApp();

app.use(express.json());

app.use('/api/', exampleRouter);
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});