/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('prisonerReputations', {
    prisoner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ЗАКЛЮЧЁННЫЙ',
        key: 'ИД'
      },
      field: 'ЗАКЛЮЧЁННЫЙ'
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'РЕПУТАЦИЯ',
        key: 'ИД'
      },
      field: 'РЕПУТАЦИЯ'
    }
  }, {
    tableName: 'РЕПУТАЦИИ_ЗАКЛЮЧЁННЫХ'
  });
};
