import * as create from './Create';
import * as getAll from './GetAll';
import { getById } from './GetById';

export const CidadeController = {
  ...create,
  ...getAll,
  ...getById,
};