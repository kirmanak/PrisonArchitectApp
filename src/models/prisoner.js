module.exports = (sequelize, DataTypes) => {
    return sequelize.define('prisoner', {
        id: {
            type: DataTypes.INTEGER,
	        allowNull: false,
	        primaryKey: true,
	        autoIncrement: true
        },
	    fullname: {
	        type: DataTypes.TEXT,
	        allowNull: false
	    },
		arrivement: {
	        type: DataTypes.DATEONLY,
	        allowNull: false,
	        defaultValue: sequelize.literal('CURRENT_DATE')
	    },
	    freedom: {
	        type: DataTypes.DATEONLY,
	        allowNull: false
	    },
        regime: {
	        type: DataTypes.INTEGER,
	        allowNull: true,
	        references: {
	            model: 'regime',
                key: 'id'
	        }
        },
        ward: {
	        type: DataTypes.INTEGER,
	        allowNull: true,
	        references: {
		        model: 'room',
		        key: 'id'
	        }
	    }
    }, {
        tableName: 'prisoner'
    });
};
