/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('appointment', {
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
      field: 'ИМЯ_ДОЛЖНОСТИ'
    },
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ИНВЕНТАРЬ',
        key: 'ИД'
      },
      field: 'ИНВЕНТАРЬ'
    }
  }, {
    tableName: 'ДОЛЖНОСТЬ'
  });
};
