/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('access_regime', {
    regime_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'regime',
        key: 'id'
      }
    },
    access_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'access',
        key: 'id'
      }
    }
  }, {
    tableName: 'access_regime'
  });
};
