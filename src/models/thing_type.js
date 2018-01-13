/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('thing_type', {
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
    }
  }, {
    tableName: 'thing_type'
  });
};
