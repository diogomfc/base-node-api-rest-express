import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string, ObjectSchema, ValidationError } from 'yup';

// Interface da cidade
interface ICidade {
  nome: string;
}

// Schema de validação
const citySchema: ObjectSchema<ICidade> = object().shape({
  nome: string().required().min(3),
});

// Método para tratar os erros de validação
const handleValidationErrors = (error: ValidationError) => {
  const validationErrors: Record<string, string> = {};

  if (error.inner.length > 0) {
    error.inner.forEach((err) => {
      if (err.path) {
        validationErrors[err.path] = err.message;
      }
    });
  }

  return validationErrors;
};

// Middleware de validação
export const createBodyValidation: RequestHandler = async (req, res, next) => {
  try {
    const { body } = req;
    await citySchema.validate(body, { abortEarly: false });
    next();
  } catch (error) {
    const yupError = error as ValidationError;
    const validationErrors = handleValidationErrors(yupError);
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
  }
};

//Método para adicionar uma cidade
export const add = async (req: Request<{}, {}, ICidade>, res: Response) => {
  const { body } = req;
  console.log(body);
  return res.send('Create Create!');
};


