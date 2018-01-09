/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('access', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ИД'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'НАЗВАНИЕ'
    }
  }, {
    tableName: 'ДОСТУП'
  });
};
