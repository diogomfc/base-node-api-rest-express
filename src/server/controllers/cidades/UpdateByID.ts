import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, number, object, string } from 'yup';
import { validation } from '../../shared/middlewares';

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
  // console.log(params);
  // console.log(body);

  if (Number(params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors:{
      default: 'Registro não encontrado'
    }
  });

  return res.status(StatusCodes.NO_CONTENT).send();
 
};