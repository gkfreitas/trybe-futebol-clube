import { Router } from 'express';
import loginRouter from './login.router';
import teamsRouter from './team.router';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
