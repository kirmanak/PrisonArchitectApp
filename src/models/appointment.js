/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appointment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    inventory_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'inventory',
        key: 'id'
      }
    }
  }, {
    tableName: 'appointment'
  });
};
