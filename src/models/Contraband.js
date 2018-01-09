/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('contraband', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ИД'
    },
    object: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ОБЪЕКТ',
        key: 'ИД'
      },
      field: 'ОБЪЕКТ'
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ЗАКЛЮЧЁННЫЙ',
        key: 'ИД'
      },
      field: 'ВЛАДЕЛЕЦ'
    },
    discoveredBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ПЕРСОНАЛ',
        key: 'ИД'
      },
      field: 'ОБНАРУЖИВШИЙ'
    },
    discoveredAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '(now',
      field: 'ДАТА_ОБНАРУЖЕНИЯ'
    }
  }, {
    tableName: 'КОНТРАБАНДА'
  });
};
