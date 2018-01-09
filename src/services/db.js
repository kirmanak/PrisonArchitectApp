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

// Загрузка моделей
const appointment = db.import('../models/Appointment.js');
const access = db.import('../models/Access.js');
const prisoner = db.import('../models/Prisoner.js');
const inventory = db.import('../models/Inventory.js');
const contraband = db.import('../models/Contraband.js');
const object = db.import('../models/Object.js');
const staff = db.import('../models/Staff.js');
const room = db.import('../models/Room.js');
const program = db.import('../models/Program.js');
const regime = db.import('../models/Regime.js');
const reputation = db.import('../models/Reputation.js');
const thingType = db.import('../models/Thing_type.js');
const user = db.import('../models/User.js');

// MtM
const inventoryContents = db.import('../models/Inventory_contents.js');
const accessRegime = db.import('../models/Access_regime.js');
const prisonerReputations = db.import('../models/Prisoner_reputations.js');
const prisonerPrograms = db.import('../models/Prisoner_programs.js');

module.exports = {
    initialize: () => { return db; },
    // db synchronization
    sync: () => {
        appointment.hasMany(staff, {foreignKey: 'ДОЛЖНОСТЬ'});
	inventory.hasOne(inventory, {foreignKey: 'ИНВЕНТАРЬ'});
	room.hasMany(staff, {foreignKey: 'РАБОЧЕЕ_МЕСТО'});
	room.hasMany(prisoner, {foreignKey: 'КАМЕРА'});
	room.hasMany(object, {foreignKey: 'ПОМЕЩЕНИЕ'});
	room.hasOne(program, {foreignKey: 'ПОМЕЩЕНИЕ'});
	access.hasMany(room, {foreignKey: 'ДОСТУП'});
	access.hasOne(accessRegime, {foreignKey: 'ДОСТУП'});
	staff.hasMany(contraband, {foreignKey: 'ОБНАРУЖИВШИЙ'});
	prisoner.hasMany(contraband, {foreignKey: 'ВЛАДЕЛЕЦ'});
	object.hasMany(contraband, {foreignKey: 'ОБЪЕКТ'});
	prisoner.hasOne(regime, {foreignKey: 'РЕЖИМ'});
	regime.hasOne(accessRegime, {foreignKey: 'РЕЖИМ'});
	staff.hasOne(program, {foreignKey: 'ПРЕПОДАВАТЕЛЬ'});
	program.hasMany(prisonerPrograms, {foreignKey: 'ПРОГРАММА'});
	prisoner.hasMany(prisonerPrograms, {foreignKey: 'ЗАКЛЮЧЁННЫЙ'});
	prisoner.hasMany(prisonerReputations, {foreignKey: 'ЗАКЛЮЧЁННЫЙ'});
	reputation.hasMany(prisonerReputations, {foreignKey: 'РЕПУТАЦИЯ'});
	thingType.hasMany(object, {foreignKey: 'ТИП_ВЕЩИ'});
	thingType.hasMany(inventoryContents, {foreignKey: 'ТИП_ВЕЩИ'});
	inventory.hasMany(inventoryContents, {foreignKey: 'ИНВЕНТАРЬ'});
	appointment.sync();
	inventory.sync();
	inventoryContents.sync();
	thingType.sync();
	reputation.sync();
	object.sync();
	prisonerReputations.sync();
	staff.sync();
	prisoner.sync();
	prisonerPrograms.sync();
	program.sync();
	regime.sync();
	contraband.sync();
	accessRegime.sync();
	access.sync();
	room.sync();
        user.sync();
    },
    // drop db
    drop: () => {
	appointment.drop();
	inventory.drop();
	inventoryContents.drop();
	thingType.drop();
	reputation.drop();
	object.drop();
	prisonerReputations.drop();
	staff.drop();
	prisoner.drop();
	prisonerPrograms.drop();
	program.drop();
	regime.drop();
	contraband.drop();
	accessRegime.drop();
	access.drop();
	room.drop();
        user.drop();
    }
};
