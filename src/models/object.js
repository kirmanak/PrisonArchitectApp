/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('object', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    thing_type_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'thing_type',
        key: 'id'
      }
    },
    room_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'room',
        key: 'id'
      }
    }
  }, {
    tableName: 'object'
  });
};
