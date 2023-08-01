import { Request, Response } from 'express';
import { object, string, ObjectSchema, ValidationError } from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

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
  console.log(body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};