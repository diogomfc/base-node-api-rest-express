import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

// Gerar uma suite de testes para o método GET BY ID /cidades
describe('GetById /cidades', () => {

  //Teste para listar uma cidade por ID
  it('Deve buscar registro por id', async () => {
    //criar registro para teste
    const response = await testServer
      .post('/cidades')
      .send({
        nome: 'São Paulo',
      });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');

    const responseBuscar = await testServer
      .get(`/cidades/${response.body}`)
      .send();

    expect(responseBuscar.statusCode).toBe(StatusCodes.OK);
    expect(responseBuscar.body).toHaveProperty('nome');
  });

  // Teste para verificar quando o ID não existe
  it('Tenta buscar registro que não existe', async () => {
    const response = await testServer
      .get('/cidades/99999')
      .send();
    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });

});