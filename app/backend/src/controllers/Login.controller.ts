import { Request, Response } from 'express';
import LoginService from '../services/Login.service';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async findUser(req: Request, res: Response) {
    const ServiceResponse = await this.loginService.findUser(req.body);
    if (ServiceResponse.status !== 'SUCCESSFUL') return res.status(401).json(ServiceResponse.data);
    return res.status(200).json(ServiceResponse.data);
  }
}
