import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, object, string } from 'yup';
import { validation } from '../../shared/middlewares';

// Interface da cidade
interface ICidade {
  nome: string;
}

// Schema de validação
const citySchema: ObjectSchema<ICidade> = object().shape({
  nome: string().required().min(3),
});

export const createValidation = validation({
  body: citySchema,
});

//Método para adicionar uma cidade
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  const { body } = req;
  //console.log(body);
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
  return res.status(StatusCodes.CREATED).json(1);
};