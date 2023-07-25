import { Request, Response, Router } from 'express';
import TeamController from '../controllers/Team.controller';

const teamController = new TeamController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.listTeams(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => teamController.findTeam(req, res),
);

export default router;
