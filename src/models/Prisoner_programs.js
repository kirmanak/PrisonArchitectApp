/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('prisonerPrograms', {
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
    program: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ПРОГРАММА',
        key: 'ИД'
      },
      field: 'ПРОГРАММА'
    }
  }, {
    tableName: 'ПРОГРАММЫ_ЗАКЛЮЧЁННЫХ'
  });
};
