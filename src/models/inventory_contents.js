module.exports = (sequelize, DataTypes) => {
    return sequelize.define('inventory_contents', {
        inventory: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    references: {
		model: 'inventory',
		key: 'id'
            }
	},
	thing_type: {
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
