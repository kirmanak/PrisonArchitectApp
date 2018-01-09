/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('room', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ИД'
    },
    assignment: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'НАЗНАЧЕНИЕ'
    },
    access: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ДОСТУП',
        key: 'ИД'
      },
      field: 'ДОСТУП'
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ПЛОЩАДЬ'
    },
    street: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'УЛИЧНОЕ'
    }
  }, {
    tableName: 'ПОМЕЩЕНИЕ'
  });
};
