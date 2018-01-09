/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('staff', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ИД'
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ФИО'
    },
    appointment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ДОЛЖНОСТЬ',
        key: 'ИД'
      },
      field: 'ДОЛЖНОСТЬ'
    },
    officeRoom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ПОМЕЩЕНИЕ',
        key: 'ИД'
      },
      field: 'РАБОЧЕЕ_МЕСТО'
    }
  }, {
    tableName: 'ПЕРСОНАЛ'
  });
};
