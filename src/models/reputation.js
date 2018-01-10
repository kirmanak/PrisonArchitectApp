module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reputation', {
        id: {
            type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true
	},
	effect: {
	    type: DataTypes.TEXT,
	    allowNull: false
	},
	name: {
	    type: DataTypes.STRING,
	    allowNull: false,
	    unique: true
	}
    }, {
        tableName: 'reputation'
    });
};
