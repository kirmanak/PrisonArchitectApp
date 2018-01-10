module.exports = (sequelize, DataTypes) => {
    return sequelize.define('staff', {
	id: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true
	},
        fullname: {
	    type: DataTypes.STRING,
	    allowNull: false
	},
	appointment: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
		model: 'appointment',
		key: 'id'
	    }
        },
        office: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
		model: 'room',
		key: 'id'
	    }
	}
    }, {
        tableName: 'staff'
    });
};
