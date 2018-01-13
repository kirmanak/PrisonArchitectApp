/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    appointment_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'appointment',
        key: 'id'
      }
    },
    office_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'room',
        key: 'id'
      }
    }
  }, {
    tableName: 'staff'
  });
};
