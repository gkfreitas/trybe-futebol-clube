import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import db from '.';
import Match from './MatchModel';

class Team extends Model<InferAttributes<Team>,
InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;

  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});
Team.belongsTo(Match, { foreignKey: 'homeTeamId', as: 'id' });
Team.belongsTo(Match, { foreignKey: 'awayTeamId', as: 'id' });
Match.hasMany(Team, { foreignKey: 'awayTeamId', as: 'id' });
Match.hasMany(Team, { foreignKey: 'homeTeamId', as: 'id' });

export default Team;
