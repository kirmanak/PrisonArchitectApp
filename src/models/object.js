module.exports = (sequelize, DataTypes) => {
    return sequelize.define('object', {
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true
	},
	thing_type: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
		model: 'thing_type',
		key: 'id'
	    }
	},
	room: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
		model: 'room',
		key: 'id'
	    }
        }
    }, {
        tableName: 'object'
    });
};
