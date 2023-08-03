import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema, ValidationError } from 'yup';

type ValidationField = 'body' | 'header' | 'params' | 'query';

// Defina um tipo para armazenar os esquemas de validação por campo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ValidationSchemas = Partial<Record<ValidationField, ObjectSchema<any>>>;

// Middleware de validação genérico
export const validation: (schemas: ValidationSchemas) => RequestHandler = (schemas) => async (req, res, next) => {
  // Objeto para armazenar os erros por campo
  const errorsResult: Record<string, Record<string, string>> = {};

  // Itera sobre os esquemas de validação e valida os campos correspondentes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const [field, schema] of Object.entries(schemas) as [ValidationField, ObjectSchema<any>][]) {
    try {
      // Valida o campo usando o esquema (schema) fornecido
      schema?.validateSync(req[field], { abortEarly: false });
    } catch (error) {
      const yupError = error as ValidationError;
      const errors: Record<string, string> = {};

      // Extrai os erros de validação individuais e os armazena em um objeto
      yupError.inner.forEach((err) => {
        if (err.path === undefined) return;
        errors[err.path] = err.message;
      });

      // Armazena os erros por campo
      errorsResult[field] = errors;
    }
  }

  // Se houver erros, envia uma resposta de erro
  // Se não houver erros, passa para o próximo middleware
  if (Object.entries(errorsResult).length === 0) {
    next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errorsResult,
    });
  }
};

// type ValidationField = 'body' | 'header' | 'params' | 'query';

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// type AllSchemas = Record<ValidationField, ObjectSchema<any>>;
// type ValidationMiddleware = (schemas: Partial<AllSchemas>) => RequestHandler;


// // Middleware de validação genérico
// export const validation: ValidationMiddleware = (schemas) => async (req, res, next) => {
  
//   const errorsResult: Record<string, Record<string, string>> = {};
  
//   Object.entries(schemas).forEach(([field, schema]) => {
//     try{
//       schema?.validateSync(req[field as ValidationField], { abortEarly: false });
//       // next();
//     } catch (error) {
//       const yupError = error as ValidationError;
//       const errors: Record<string, string> = {};
      
//       yupError.inner.forEach((err) => {
//         if (err.path === undefined) return;
//         errors[err.path] = err.message;
//       });

//       errorsResult[field] = errors;
//     }
//   });

//   if (Object.entries(errorsResult).length === 0) {
//     next();
//   } else {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       errors: errorsResult,
//     });
//   }
// };

