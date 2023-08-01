import { Request, Response } from 'express';
import { object, string, ObjectSchema, ValidationError } from 'yup';
import { validation } from '../../shared/middlewares';

// Interface da cidade
interface ICidade {
  nome: string;
  estado: string;
}

interface IFilter {
  filter?: string;
  limit?: string;
}

// Schema de validação
const citySchema: ObjectSchema<ICidade> = object().shape({
  nome: string().required().min(3),
  estado: string().required().min(2),
});

// Schema de validação para filtros
const filterSchema: ObjectSchema<IFilter> = object().shape({
  filter: string().required().min(3),
  limit: string().min(2),
});

export const createValidation = validation({
  body: citySchema,
  query: filterSchema,
});

//Método para adicionar uma cidade
export const add = async (req: Request<{}, {}, ICidade>, res: Response) => {
  const { body } = req;
  console.log(body);
  return res.send('Create Create!');
};