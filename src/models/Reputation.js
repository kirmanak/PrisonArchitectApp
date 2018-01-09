/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('reputation', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ИД'
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'ЭФФЕКТ'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'НАЗВАНИЕ'
    }
  }, {
    tableName: 'РЕПУТАЦИЯ'
  });
};
