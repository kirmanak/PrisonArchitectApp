module.exports = (sequelize, DataTypes) => {
    return sequelize.define('prisoner_program', {
	prisoner: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    references: {
		model: 'prisoner',
		key: 'id'
	    }
	},
	program: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    references: {
		model: 'program',
		key: 'id'
	    }
	}
    }, {
	tableName: 'prisoner_program'
    });
};
