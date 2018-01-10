module.exports = (sequelize, DataTypes) => {
    return sequelize.define('appointment', {
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
	},
	inventory: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
	        model: 'inventory',
		key: 'id'
	    }
	}
    }, {
	tableName: 'appointment'
    });
};
