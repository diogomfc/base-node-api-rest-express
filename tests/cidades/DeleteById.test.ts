import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

describe('Testando a rota DeleteById /cidades', () => {
  
  // Deve deletar uma cidade pelo ID
  it('Deve deletar uma cidade pelo ID', async () => {
    
    //Criando uma cidade para testar
    const response = await testServer
      .post('/cidades')
      .send({nome: 'Barueri'});
    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    //Deletando a cidade criada
    const responseDelete = await testServer
      .delete(`/cidades/${response.body}`)
      .send();

    expect(responseDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  //Deve deletar uma registro de cidade que não existe
  it('Deve deletar uma registro de cidade que não existe', async () => {
    const response = await testServer
      .delete('/cidades/99999')
      .send();
    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');

  });

});