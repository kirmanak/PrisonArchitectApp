/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('inventoryContents', {
    inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ИНВЕНТАРЬ',
        key: 'ИД'
      },
      field: 'ИНВЕНТАРЬ'
    },
    thing_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ТИП_ВЕЩИ',
        key: 'ИД'
      },
      field: 'ТИП_ВЕЩИ'
    }
  }, {
    tableName: 'СОДЕРЖИМОЕ_ИНВЕНТАРЯ'
  });
};
