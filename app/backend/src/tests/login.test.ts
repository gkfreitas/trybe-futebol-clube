import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import UserModel from '../database/models/SequelizeUserModel';
import loginMock from './mocks/loginMock';
// @ts-ignore
import chaiHttp = require('chai-http');;
chai.use(chaiHttp);
const { expect } = chai;

describe('Testes de integração do Login', () => {
  beforeEach(function() { sinon.restore()})
  it('Ao enviar os dados corretos retorna um token',  async function() {
    // Arrange
    const httpRequestBody = loginMock.loginBody
    const mockFindOneReturn = UserModel.build(loginMock.newUser)
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn)
    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    // Assert
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.have.key('token')
  });

  it('Ao enviar dados sem um email retorna um erro', async function() {
    // Arrange
    const httpRequestBody = loginMock.loginBodyWithoutEmail
    const mockFindOneReturn = UserModel.build(loginMock.newUser)
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn)

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    // Assert
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ "message": "All fields must be filled" })
  });

  it('Ao enviar dados sem uma senha retorna um erro', async function() {
    // Arrange
    const httpRequestBody = loginMock.loginBodyWithoutPassword
    const mockFindOneReturn = UserModel.build(loginMock.newUser)
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn)

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    // Assert
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal({ "message": "All fields must be filled" })
  });

  it('Ao receber um email inválido retorna erro', async function() {
    // Arrange
    const httpRequestBody = loginMock.loginInvalidEmail
    const mockFindOneReturn = UserModel.build(loginMock.newUser)
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn)

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    // Assert
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.deep.equal({ "message": "Invalid email or password" })
  });

  it('Ao receber uma senha inválida retorna erro', async function() {
    // Arrange
    const httpRequestBody = loginMock.loginInvalidPassword
    const mockFindOneReturn = UserModel.build(loginMock.newUser)
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn)

    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

    // Assert
    expect(httpResponse.status).to.equal(401)
    expect(httpResponse.body).to.deep.equal({ "message": "Invalid email or password" })
  });
})