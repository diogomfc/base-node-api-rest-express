import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';

describe('Testando a rota GetAll /cidades', () => {
  
  // teste para verificando se o endpoint está funcionando
  it('Verificando se o endpoint está funcionando', async () => {
    const response = await testServer
      .get('/');
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  // teste para listar todas as cidades
  it('Deve listar todas as cidades', async () => {
    
    const response = await testServer
      .post('/cidades')
      .send({nome: 'Barueri'});
    expect(response.statusCode).toEqual(StatusCodes.CREATED);

    
    const responseBuscar = await testServer
      .get('/cidades')
      .send();
    expect(Number(responseBuscar.header['x-total-count'])).toBeGreaterThan(0);
    expect(responseBuscar.statusCode).toEqual(StatusCodes.OK);
    expect(responseBuscar.body.length).toBeGreaterThan(0);
  });
  

});