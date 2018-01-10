module.exports = (sequelize, DataTypes) => {
    return sequelize.define('reputation_prisoner', {
	prisoner: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    references: {
		model: 'prisoner',
		key: 'id'
	    }
	},
	reputation: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    references: {
	        model: 'reputation',
		key: 'id'
	    }
        }
    }, {
	tableName: 'reputation_prisoner'
    });
};
