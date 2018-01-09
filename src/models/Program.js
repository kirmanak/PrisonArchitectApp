/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('program', {
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
    },
    teacher: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ПЕРСОНАЛ',
        key: 'ИД'
      },
      field: 'ПРЕПОДАВАТЕЛЬ'
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ПОМЕЩЕНИЕ',
        key: 'ИД'
      },
      field: 'ПОМЕЩЕНИЕ'
    },
    schedule: {
      type: DataTypes.TIME,
      allowNull: false,
      field: 'ВРЕМЯ'
    }
  }, {
    tableName: 'ПРОГРАММА'
  });
};
