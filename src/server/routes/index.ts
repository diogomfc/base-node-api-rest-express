import {Router} from 'express';
import {StatusCodes} from 'http-status-codes';

const router = Router();


router.get('/', (_, res) => {
  try{
    res.send('Hello World');
  } catch(err){
    console.log(err);
  }

});

router.post('/teste', (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.CREATED).send();
});


export {router};