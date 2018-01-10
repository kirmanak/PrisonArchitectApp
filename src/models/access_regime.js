module.exports = (sequelize, DataTypes) => {
    return sequelize.define('access_regime', {
        regime: {
            type: DataTypes.INTEGER,
	    allowNull: false,
	    primaryKey: true,
	    references: {
                model: 'regime',
		key: 'id'
	    }
	},
        access: {
	    type: DataTypes.INTEGER,
	    allowNull: false,
	    references: {
                model: 'access',
		key: 'id'
	    }
	}
    }, {
        tableName: 'access_regime'
    });
};
