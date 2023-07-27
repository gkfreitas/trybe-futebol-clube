import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';
import MatchesMock from './mocks/MatchesMock';
// @ts-ignore
import chaiHttp = require('chai-http');;
chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para o ENDPOINT /matches', () => {
  it('Ao fazer um get no ENDPOINT /matches deve retornar as partidas',  async function() {
    // Arrange
    sinon.stub(SequelizeMatchModel, 'findAll').resolves(MatchesMock.matches as any)
    // Act
    const httpResponse = await chai.request(app).get('/matches')

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(MatchesMock.matches)

  });

});