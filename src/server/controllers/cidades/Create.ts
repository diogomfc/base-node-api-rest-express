import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICidade {
  nome: string;
}

const bodyValidation: yup.ObjectSchema<ICidade> = yup.object().shape({
  nome: yup.string().required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body,{abortEarly: false});
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const validationErrors: Record<string, string> = {};

    if (yupError.inner.length > 0) {
      yupError.inner.forEach((error) => {
        if (error.path) {
          validationErrors[error.path] = error.message;
        }
      });
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors
    });
  }

  console.log(validatedData);

  return res.send('Create Create!');
};