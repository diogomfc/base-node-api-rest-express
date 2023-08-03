import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

//Suite de testes
describe('Testando a rota PUT /cidades', () => {
  //Casos de testes

  //Verificar se a rota PUT /cidades exite
  //it('Verificar se a rota PUT /cidades exite'),async () => {};

  //Deve atualizar a cidade pelo ID
  it('Deve atualizar a cidade pelo ID',async () => {
    //criar registro para teste
    const response = await testServer
      .post('/cidades')
      .send({
        nome: 'São Paulo',
      });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');

    const responseAtualizar = await testServer
      .put(`/cidades/${response.body}`)
      .send({nome: 'Barueri'});

    expect(responseAtualizar.statusCode).toBe(StatusCodes.NO_CONTENT);
    
  });

  //Deve retorna erro se nome não existes
  it('Tenta atualizar um registro que não existe',async () => {
    
    const response = await testServer
      .put('/cidades/99999')
      .send({nome: 'Barueri'});
      
    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });

});