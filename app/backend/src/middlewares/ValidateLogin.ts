import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/SequelizeUserModel';
import jwtUtil from '../utils/jwt.util';

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) return res.status(400).json({ message: 'All fields must be filled' });
    console.log(!regex.test('invalid.user@user.com"'));
    if (!regex.test(email)) return res.status(401).json({ message: 'Invalid email or password' });
    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
    next();
  }

  static async validateToken(req: Request, res: Response):
  Promise<Promise<Response | void>> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = extractToken(authorization);
    try {
      const decoded = jwtUtil.verify(token);
      const user = await UserModel.findOne({ where: { email: decoded.email } });
      if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
      const { dataValues: { role } } = user;
      console.log(role);
      return res.status(200).json({ role });
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default Validations;
