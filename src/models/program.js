/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('program', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    teacher_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    room_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'room',
        key: 'id'
      }
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    tableName: 'program'
  });
};
