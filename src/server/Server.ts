import express from 'express';

import 'dotenv/config';

import {router} from './routes';

const server = express();

//usar as rotas do arquivo routes.ts no server
server.use(router);
server.use(express.json());


export {server};