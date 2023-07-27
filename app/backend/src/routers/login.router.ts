import { Request, Response, Router } from 'express';
import LoginController from '../controllers/Login.controller';
import Validations from '../middlewares/Validations';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => loginController.findUser(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => loginController.role(req, res),
);

export default router;
