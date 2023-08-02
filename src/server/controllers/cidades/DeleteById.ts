import { Request, Response } from 'express';
import { object, ObjectSchema, number } from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

// Interface da cidade
interface IParamProps {
 id?: number;
}

// Schema de validação
const citySchema: ObjectSchema<IParamProps> = object().shape({
  id: number().min(0).integer().required().moreThan(0),
});

// Middleware de validação
export const deleteByIdValidation = validation({
  params: citySchema,
});

//Método para listar todas as cidades
export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  const { params } = req;
  console.log(params);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};