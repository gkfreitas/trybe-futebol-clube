import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';
import teamsMock from './mocks/teamsMock';
// @ts-ignore
import chaiHttp = require('chai-http');;





chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de integração para o ENDPOINT /teams', () => {
  it('Ao fazer um get no ENDPOINT /teams deve retornar os times e seu ID',  async function() {
    // Arrange
    sinon.stub(SequelizeTeamModel, 'findAll').resolves(teamsMock.allTeams as any)
    // Act
    const httpResponse = await chai.request(app).get('/teams')

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(teamsMock.allTeams)

  });

  it('Ao buscar um time pelo ID retorna o time correto', async function() {
    // Arrange
    sinon.stub(SequelizeTeamModel, 'findByPk').resolves(teamsMock.foundedTeam as any)
    // Act
    const httpResponse = await chai.request(app).get('/teams/1')
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(teamsMock.foundedTeam);
  });
});