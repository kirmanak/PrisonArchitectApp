module.exports = (sequelize, DataTypes) => {
    return sequelize.define('room', {
        id: {
            type: DataTypes.INTEGER,
	        allowNull: false,
	        primaryKey: true,
	        autoIncrement: true
	    },
	    assignment: {
	        type: DataTypes.STRING,
	        allowNull: false
    	},
        access: {
    	    type: DataTypes.INTEGER,
	        allowNull: true,
	        references: {
			    model: 'access',
	            key: 'id'
    	    }
	    },
	    area: {
	        type: DataTypes.INTEGER,
            allowNull: false
        },
        street: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
	    tableName: 'room'
    });
};
