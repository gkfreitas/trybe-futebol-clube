import { Request, Response } from 'express';
import { IUserModel } from '../Interfaces/IUserModel';
import UserModel from '../models/UserModel';
import LoginService from '../services/Login.service';
import jwtUtil from '../utils/jwt.util';

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async findUser(req: Request, res: Response) {
    const ServiceResponse = await this.loginService.findUser(req.body);
    if (ServiceResponse.status !== 'SUCCESSFUL') return res.status(401).json(ServiceResponse.data);
    return res.status(200).json(ServiceResponse.data);
  }

  public async role(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = extractToken(authorization?.toString());
    const decoded = jwtUtil.verify(token);
    const user = await this.userModel.find({ email: decoded.email, password: '' });
    const role = user?.role;
    return res.status(200).json({ role });
  }
}
