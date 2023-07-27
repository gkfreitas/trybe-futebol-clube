import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async listMatches(_req: Request, res: Response) {
    const ServiceResponse = await this.matchService.listMatches();
    res.status(200).json(ServiceResponse.data);
  }

  public async listMatchesFiltered(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    if (!inProgress) return next();
    const booleanValue = ((inProgress.toString()).toLowerCase() === 'true');
    const ServiceResponse = await this.matchService.listMatchesFiltered(booleanValue);
    res.status(200).json(ServiceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.updateMatch(+id);
    res.status(200).json({ message: 'Finished' });
  }

  public async updateInProgress(req: Request, res: Response) {
    const { id } = req.params;
    const ServiceResponse = await this.matchService.updateInProgress(req.body, +id);
    res.status(200).json(ServiceResponse.data);
  }

  public async create(req: Request, res: Response) {
    const { body } = req;
    const ServiceResponse = await this.matchService.create(body);
    res.status(201).json(ServiceResponse.data);
  }
}
