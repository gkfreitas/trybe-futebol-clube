import { ITeam } from './ITeam';

export interface ITeamModel {
  list(): Promise<ITeam[]>,
  find(id: number): Promise<ITeam | null>;
}
