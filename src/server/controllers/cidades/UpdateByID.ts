import { Request, Response } from 'express';
import { object, ObjectSchema, number, string } from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

// Interface da cidade
interface IBodyProps {
 nome: string;
}

interface IParamProps {
  id?: number;
}

// Schema de validação
const bodySchema: ObjectSchema<IBodyProps> = object().shape({
  nome: string().required().min(3),
});

const paramSchema: ObjectSchema<IParamProps> = object().shape({
  id: number().min(0).integer().required().moreThan(0),
});


// Middleware de validação
export const updateByIdValidation = validation({
  body: bodySchema,
  params: paramSchema,
});

//Método para listar todas as cidades
export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  const { params, body } = req;
  console.log(params);
  console.log(body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};