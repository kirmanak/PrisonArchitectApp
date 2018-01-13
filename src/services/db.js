const Sequelize = require('sequelize'),
    config = require('../config/config.json');

const db = new Sequelize(config.database, config.dbUser, config.dbPass, 
    {
        host: config.dbHost,
		dialect: 'postgres',
        native: true,
        define: { timestamps: false},
		pool: {
            max: 5,
	    	min: 0,
            acquire: 30000,
	    	idle: 10000
		},
        operatorsAliases: false
    }
);

// Loading models
const appointment = db.import('../models/appointment.js');
const access = db.import('../models/access.js');
const prisoner = db.import('../models/prisoner.js');
const inventory = db.import('../models/inventory.js');
const contraband = db.import('../models/contraband.js');
const object = db.import('../models/object.js');
const staff = db.import('../models/staff.js');
const room = db.import('../models/room.js');
const program = db.import('../models/program.js');
const regime = db.import('../models/regime.js');
const reputation = db.import('../models/reputation.js');
const thingType = db.import('../models/thing_type.js');
const gamer = db.import('../models/gamer.js');

// MtM
const inventoryContents = db.import('../models/inventory_contents.js');
const accessRegime = db.import('../models/access_regime.js');
const reputationPrisoner = db.import('../models/reputation_prisoner.js');
const prisonerProgram = db.import('../models/prisoner_program.js');

module.exports = {
    initialize: () => { return db; },
    // db synchronization
    sync: () => {
        appointment.hasMany(staff, {foreignKey: 'appointment'});
		inventory.hasOne(appointment, {foreignKey: 'inventory'});
		room.hasMany(staff, {foreignKey: 'office'});
		room.hasMany(prisoner, {foreignKey: 'ward'});
		room.hasMany(object, {foreignKey: 'room'});
		room.hasOne(program, {foreignKey: 'room'});
		access.hasMany(room, {foreignKey: 'access'});
		access.hasOne(accessRegime, {foreignKey: 'access'});
		staff.hasMany(contraband, {foreignKey: 'discovered_by'});
		prisoner.hasMany(contraband, {foreignKey: 'owner'});
		object.hasMany(contraband, {foreignKey: 'object'});
        regime.belongsTo(prisoner, {foreignKey: 'regime'});
		regime.hasOne(accessRegime, {foreignKey: 'regime'});
		staff.hasOne(program, {foreignKey: 'teacher'});
		program.hasMany(prisonerProgram, {foreignKey: 'program'});
		prisoner.hasMany(prisonerProgram, {foreignKey: 'prisoner'});
		prisoner.hasMany(reputationPrisoner, {foreignKey: 'prisoner'});
		reputation.hasMany(reputationPrisoner, {foreignKey: 'reputation'});
		thingType.hasMany(object, {foreignKey: 'thing_type'});
		thingType.hasMany(inventoryContents, {foreignKey: 'thing_type'});
		inventory.hasMany(inventoryContents, {foreignKey: 'inventory'});
		appointment.sync();
		inventory.sync();
		inventoryContents.sync();
		thingType.sync();
		reputation.sync();
		object.sync();
		reputationPrisoner.sync();
		staff.sync();
		prisoner.sync();
		prisonerProgram.sync();
		program.sync();
		regime.sync();
		contraband.sync();
		accessRegime.sync();
		access.sync();
		room.sync();
        gamer.sync();
    },
    // drop db
    drop: () => {
		appointment.drop();
		inventory.drop();
		inventoryContents.drop();
		thingType.drop();
		reputation.drop();
		object.drop();
		reputationPrisoner.drop();
		staff.drop();
		prisoner.drop();
		prisonerProgram.drop();
		program.drop();
		regime.drop();
		contraband.drop();
		accessRegime.drop();
		access.drop();
		room.drop();
        gamer.drop();
    }
};
