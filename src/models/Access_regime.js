/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('accessRegime', {
    regime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'РЕЖИМ',
        key: 'ИД'
      },
      field: 'РЕЖИМ'
    },
    access: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ДОСТУП',
        key: 'ИД'
      },
      field: 'ДОСТУП'
    }
  }, {
    tableName: 'ДОСТУПЫ_РЕЖИМОВ'
  });
};
