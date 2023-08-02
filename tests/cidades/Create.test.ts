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
    const response = await testServer.post('/cidades').send({
      nome: 'São Paulo',
    });
    expect(response.body).toEqual(1);
  });

  // Teste para verificar quando o nome tiver menos de 3 caracteres
  it('should return error when nome is less than 3 characters', async () => {
    const response = await testServer.post('/cidades').send({
      nome: 'SP',
    });
    expect(response.body).toEqual({
      errors: {
        body: {
          nome: 'Deve ter pelo menos 3 caracteres',
        },
      },
    });
  });

  // Teste para verificar quando o nome não é fornecido
  it('should return error when nome is not provided', async () => {
    const response = await testServer.post('/cidades').send({});
    expect(response.body).toHaveProperty('errors.body.nome');
    expect(response.body).toEqual({
      errors: {
        body: {
          nome: 'Este campo é obrigatório',
        },
      },
    });
  }
  );

});