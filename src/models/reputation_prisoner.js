/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reputation_prisoner', {
    prisoner_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'prisoner',
        key: 'id'
      }
    },
    reputation_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reputation',
        key: 'id'
      }
    }
  }, {
    tableName: 'reputation_prisoner'
  });
};
