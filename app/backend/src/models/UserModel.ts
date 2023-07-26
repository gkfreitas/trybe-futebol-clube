import { ILogin } from '../Interfaces/ILogin';
import { IUser } from '../Interfaces/IUser';
import { IUserModel } from '../Interfaces/IUserModel';
import SequelizeUserModel from '../database/models/SequelizeUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUserModel;

  async find(login: ILogin): Promise<IUser | null> {
    const { email } = login;
    const foundedUser = await this.model.findOne({ where: { email } });
    if (foundedUser === null) return null;
    return foundedUser;
  }
}
