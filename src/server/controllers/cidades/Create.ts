import {Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';

interface CidadeController {
  nome: string;
  estado: string;
}

export const create = async (req: Request<{},{}, CidadeController>, res: Response) => {
  try{
    const data: CidadeController = req.body;


  } catch(err){
    console.log(err);
  }
};


// export const Create = async (req, res) => {
//   const {nome, estado} = req.body;
//   const {Cidade} = req.context.models;
//   const cidade = await Cidade.create({
//     nome,
//     estado
//   });
//   return res.send(cidade);
// };