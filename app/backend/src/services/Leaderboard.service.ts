import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { IMatch } from '../Interfaces/IMatch';
import { IMatchModel } from '../Interfaces/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchModel from '../models/MatchModel';

export default class LeaderboardService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async listLeaderboard(): Promise<ServiceResponse<ILeaderboard[]> | null> {
    const allMatchesFinished = await this.matchModel.listFilter(false);
    const homeTeamIds = allMatchesFinished?.map((e) => e.homeTeamId);
    const uniqueHomeTeamIds = [...new Set(homeTeamIds)];
    if (!allMatchesFinished) return null;
    const leaderboard = uniqueHomeTeamIds.map((id) => {
      const verifyId = allMatchesFinished.filter((e) => e.homeTeamId === id);
      return verifyId;
    });
    const leaderboardTransformed = leaderboard.map((e) => {
      const newObj = LeaderboardService.transformLeaderboard(e);
      return newObj;
    });
    const sortedLeaderBoard = LeaderboardService.sortLeaderboard(leaderboardTransformed);
    return { status: 'SUCCESSFUL', data: sortedLeaderBoard };
  }

  static sortLeaderboard(matches: ILeaderboard[]) {
    const sorted = matches.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      if (b.goalsFavor !== a.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      return b.totalPoints - a.totalPoints;
    });
    return sorted;
  }

  static transformLeaderboard(matches: IMatch[]): ILeaderboard {
    const newObj = {
      name: LeaderboardService.returnName(matches),
      totalPoints: LeaderboardService.returnVictoriesDrawsLoses(matches).wins * 3
      + LeaderboardService.returnVictoriesDrawsLoses(matches).draws,
      totalGames: matches.length,
      totalVictories: LeaderboardService.returnVictoriesDrawsLoses(matches).wins,
      totalDraws: LeaderboardService.returnVictoriesDrawsLoses(matches).draws,
      totalLosses: LeaderboardService.returnVictoriesDrawsLoses(matches).loses,
      goalsFavor: LeaderboardService.returnGoals(matches).homeTeamGoals,
      goalsOwn: LeaderboardService.returnGoals(matches).awayTeamGoals,
      goalsBalance: LeaderboardService.returnGoals(matches).homeTeamGoals - LeaderboardService
        .returnGoals(matches).awayTeamGoals,
      efficiency: (((LeaderboardService.returnVictoriesDrawsLoses(matches).wins * 3
      + LeaderboardService
        .returnVictoriesDrawsLoses(matches).draws) / (matches.length * 3)) * 100).toFixed(2),
    };

    return newObj;
  }

  static returnGoals(matches: IMatch[]) {
    const calcGoals = matches.reduce((acc, cur): any => {
      const obj = {
        homeTeamGoals: cur.homeTeamGoals + acc.homeTeamGoals,
        awayTeamGoals: cur.awayTeamGoals + acc.awayTeamGoals,
      };
      return obj;
    });
    return calcGoals;
  }

  static returnVictoriesDrawsLoses(matches: IMatch[]) {
    const wins = matches.filter((e) => e.homeTeamGoals > e.awayTeamGoals).length;
    const draws = matches.filter((e) => e.homeTeamGoals === e.awayTeamGoals).length;
    const loses = matches.filter((e) => e.homeTeamGoals < e.awayTeamGoals).length;
    const results = { wins, draws, loses };
    return results;
  }

  static returnName(matches: IMatch[]) {
    return matches[0].homeTeam?.teamName;
  }
}
