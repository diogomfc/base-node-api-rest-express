import { StatusCodes } from 'http-status-codes';
import { testServer } from './../jest.setup';

// Gerar uma suite de testes para o método POST /cidades
describe('POST /cidades', () => {
  // Teste para verificar se o endpoint está funcionando
  it('should return status 201', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'São Paulo',
    });
    expect(response.status).toBe(StatusCodes.CREATED);
  });

  // Teste para criar uma nova cidade
  it('should create a new city', async () => {
    const response = await testServer
      .post('/cidades')
      .send({
        nome: 'São Paulo',
      });
    expect(response.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof response.body).toEqual('number');
  });

});