//setup inicial dos tests com jest e supertest
import supertest from 'supertest';
import { server } from '../src/server/Server';


export const testServer =  supertest(server);

