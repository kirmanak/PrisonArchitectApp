/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prisoner', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    arrivement: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_DATE')
    },
    freedom: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    regime_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'regime',
        key: 'id'
      }
    },
    ward_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'room',
        key: 'id'
      }
    }
  }, {
    tableName: 'prisoner'
  });
};
