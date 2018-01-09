/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('object', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ИД'
    },
    thingType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ТИП_ВЕЩИ',
        key: 'ИД'
      },
      field: 'ТИП_ВЕЩИ'
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ПОМЕЩЕНИЕ',
        key: 'ИД'
      },
      field: 'ПОМЕЩЕНИЕ'
    }
  }, {
    tableName: 'ОБЪЕКТ'
  });
};
