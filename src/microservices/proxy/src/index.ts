'use strict';

import express from 'express';
import proxyRouter from './routes';
import Config from "./config";

const app = express();

const port = Config.portApp();
const urlApi = Config.urlApi();
const urlHealth = Config.urlHealth();

app.use(express.json());


app.use(urlApi, proxyRouter);

app.get(urlHealth, (req, res) => {
    res.json({status: 'ok'});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});