import { ILogin } from './ILogin';
import { IUser } from './IUser';

export interface IUserModel {
  find(login: ILogin): Promise<IUser | null>;
}
