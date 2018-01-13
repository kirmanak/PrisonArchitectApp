/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contraband', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    object_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'object',
        key: 'id'
      }
    },
    owner_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'prisoner',
        key: 'id'
      }
    },
    discovered_by_fk: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    discovered_on: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_DATE')
    }
  }, {
    tableName: 'contraband'
  });
};
