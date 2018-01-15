/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gamer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
        unique: true
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'gamer'
  });
};
