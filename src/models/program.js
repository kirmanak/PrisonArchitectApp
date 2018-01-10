module.exports = (sequelize, DataTypes) => {
    return sequelize.define('program', {
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
	teacher: {
	    type: DataTypes.INTEGER,
	    allowNull: true,
	    references: {
		model: 'staff',
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
	},
	time: {
	    type: DataTypes.TIME,
	    allowNull: false
	}
    }, {
        tableName: 'program'
    });
};
