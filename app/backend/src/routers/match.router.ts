import { NextFunction, Request, Response, Router } from 'express';
import MatchController from '../controllers/Match.controller';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => matchController
    .listMatchesFiltered(req, res, next),
  (req: Request, res: Response) => matchController.listMatches(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  Validations.validateMatch,
  (req: Request, res: Response) => matchController.create(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateInProgress(req, res),
);

export default router;
