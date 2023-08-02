import { Request, Response } from 'express';
import { object, string, ObjectSchema, ValidationError, number } from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

// Interface da cidade
interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

// Schema de validação
const citySchema: ObjectSchema<IQueryProps> = object().shape({
  page: number().min(0).moreThan(0),
  limit: number().min(0).moreThan(0),
  filter: string().min(0),
});

// Middleware de validação
export const getAllValidation = validation({
  query: citySchema,
});

//Método para listar todas as cidades
export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  const { query } = req;
  console.log(query);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};