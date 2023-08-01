import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { object, string, ObjectSchema, ValidationError } from 'yup';

interface ICidade {
  nome: string;
}

const citySchema: ObjectSchema<ICidade> = object().shape({
  nome: string().required().min(3),
});

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

export const add = async (req: Request<{}, {}, ICidade>, res: Response) => {
  try {
    const { body } = req;
    const validatedData = await citySchema.validate(body, { abortEarly: false });
    console.log(validatedData);
    return res.send('Create Create!');
  } catch (error) {
    const yupError = error as ValidationError;
    const validationErrors = handleValidationErrors(yupError);
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: validationErrors,
    });
  }
};
