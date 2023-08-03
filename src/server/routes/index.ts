import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CidadeController } from '../controllers';

const router = Router();

//Rota de teste
router.get('/', (_, res) => {
  res.status(StatusCodes.OK).send({
    message: 'Hello World!'
  });
});

//Rota para CRIAR uma cidade
router.post('/cidades', CidadeController.createValidation, CidadeController.create);

//Rota BUSCAR uma listar todas as cidades
router.get('/cidades', CidadeController.getAllValidation, CidadeController.getAll);

//Rota BUSCAR uma listar uma cidade pelo id
router.get('/cidades/:id', CidadeController.getByIdValidation, CidadeController.getById);

//Rota para ATUALIZAR uma cidade pelo id
router.put('/cidades/:id', CidadeController.updateByIdValidation, CidadeController.updateById);

//Rota para DELETAR uma cidade pelo id
router.delete('/cidades/:id', CidadeController.deleteByIdValidation, CidadeController.deleteById);

export { router };
