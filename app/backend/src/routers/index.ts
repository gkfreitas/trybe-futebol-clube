import { Router } from 'express';
import leaderboardRouter from './leaderboard.router';
import loginRouter from './login.router';
import matchRouter from './match.router';
import teamsRouter from './team.router';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);
export default router;
