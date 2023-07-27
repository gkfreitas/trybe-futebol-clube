import { IMatch } from './IMatch';

export type bodyUpdate = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export type bodyCreate = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export interface IMatchModel {
  list(): Promise<IMatch[]>,
  listFilter(inProgress: boolean): Promise<IMatch[] | null >
  updateMatch(id: number): Promise<IMatch | null | number[]>
  updateInProgress(body: bodyUpdate, id: number): Promise<IMatch | null>
  create(body: bodyCreate): Promise<IMatch>
}
