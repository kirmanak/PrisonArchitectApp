/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inventory_contents', {
    inventory_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'inventory',
        key: 'id'
      }
    },
    thing_type_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'thing_type',
        key: 'id'
      }
    }
  }, {
    tableName: 'inventory_contents'
  });
};
