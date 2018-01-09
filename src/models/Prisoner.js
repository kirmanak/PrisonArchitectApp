/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('prisoner', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ИД'
    },
    fullName: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'ФИО'
    },
    arrivement: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn('now'),
      field: 'ПРИБЫТИЕ'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'СРОК'
    },
    ward: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ПОМЕЩЕНИЕ',
        key: 'ИД'
      },
      field: 'КАМЕРА'
    }
  }, {
    tableName: 'ЗАКЛЮЧЁННЫЙ'
  });
};
