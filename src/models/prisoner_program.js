/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prisoner_program', {
    prisoner_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'prisoner',
        key: 'id'
      }
    },
    program_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'program',
        key: 'id'
      }
    }
  }, {
    tableName: 'prisoner_program'
  });
};
