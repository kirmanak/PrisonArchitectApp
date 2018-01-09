/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', 
      {
          id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
              field: 'id'
          },
          username: {
              type: DataTypes.STRING,
              allowNull: false,
              field: 'username'
          },
          password: {
              type: DataTypes.STRING,
              allowNull: false,
              field: 'password'
          },
  }, {
    tableName: 'ПОЛЬЗОВАТЕЛЬ'
  });
};
