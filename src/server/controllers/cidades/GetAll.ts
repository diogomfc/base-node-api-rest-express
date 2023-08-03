import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, number, object, string } from 'yup';
import { validation } from '../../shared/middlewares';

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
  
  res.setHeader('access-control-expose-headers', 'X-Total-Count');
  res.setHeader('X-Total-Count', 1);

  return res.status(StatusCodes.OK).json(
    [
      {
        id: 1,
        nome: 'São Paulo',
      },
    ]
  );
};