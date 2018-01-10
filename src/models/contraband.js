module.exports = (sequelize, DataTypes) => {
    return sequelize.define('contraband', {
	id: {
            type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    autoIncrement: true
	},
	object: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
	        model: 'object',
		key: 'id'
	    }
	},
	owner: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
		model: 'prisoner',
		key: 'id'
	    }
	},
        discovered_by: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
		model: 'staff',
		key: 'id'
	    }
	},
	discovered_on: {
	    type: DataTypes.DATEONLY,
	    allowNull: false,
	    defaultValue: sequelize.literal('CURRENT_DATE')
	}
    }, {
	tableName: 'contraband'
    });
};
