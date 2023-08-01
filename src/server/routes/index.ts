import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';

import { CidadeController } from '../controllers';

const router = Router();

//Rota de teste
router.get('/', (_, res) => {
  res.status(StatusCodes.OK).send({
    message: 'Hello World!'
  });
});

//Rota para criar uma cidade
router.post('/cidades', CidadeController.createValidation, CidadeController.add);

export {router};