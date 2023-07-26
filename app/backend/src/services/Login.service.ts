import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/ILogin';
import { IToken } from '../Interfaces/IToken';
import { IUserModel } from '../Interfaces/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/UserModel';
import jwtUtil from '../utils/jwt.util';

export default class LoginService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) {}

  public async findUser(login: ILogin): Promise<ServiceResponse<IToken>> {
    const foundedUser = await this.userModel.find(login);
    if (!foundedUser || !bcrypt.compareSync(login.password, foundedUser.password)) {
      return { status: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
    }
    const { id, email } = foundedUser;
    const token = jwtUtil.sign({ id, email });
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
