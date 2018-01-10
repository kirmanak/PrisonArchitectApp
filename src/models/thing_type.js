module.exports = (sequelize, DataTypes) => {
    return sequelize.define('thing_type', {
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
	}
    }, {
	tableName: 'thing_type'
    });
};
