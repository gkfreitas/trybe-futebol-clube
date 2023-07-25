import { DataTypes, Model, QueryInterface } from 'sequelize';
import Team from '../../Interfaces/Team';
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Team>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        field: 'team_name',
        allowNull: false,
        type: DataTypes.STRING
      }
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};