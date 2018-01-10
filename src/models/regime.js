module.exports = (sequelize, DataTypes) => {
    return sequelize.define('regime', {
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
	tableName: 'regime'
    });
};
