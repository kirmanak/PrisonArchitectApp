const Sequelize = require('sequelize');

module.exports = (config) => {
    // db synchronization
    const db = new Sequelize(config.database, config.dbUser, config.dbPass, {
        host: config.dbHost,
        dialect: 'postgres',
        native: true,
        define: { timestamps: false},
        pool: {
            max: 20,
            min: 0,
        },
        operatorsAliases: false
    });
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

    // associations
    appointment.hasMany(staff, {foreignKey: 'appointment'});
    inventory.hasOne(appointment, {foreignKey: 'inventory'});
    room.hasMany(staff, {foreignKey: 'office'});
    room.hasMany(prisoner, {foreignKey: 'ward'});
    room.hasMany(object, {foreignKey: 'room'});
    room.hasOne(program, {foreignKey: 'room'});
    access.hasMany(room, {foreignKey: 'access'});
    access.belongsToMany(regime, {
        through: accessRegime,
        foreignKey: 'access'
    });
    access.hasMany(accessRegime, {foreignKey: 'access'});
    regime.hasMany(accessRegime, {foreignKey: 'regime'});
    regime.belongsToMany(access, {
        through: accessRegime,
        foreignKey: 'regime'
    });
    regime.hasMany(prisoner, {foreignKey: 'regime'});
    staff.hasOne(program, {foreignKey: 'teacher'});
    staff.hasMany(contraband, {foreignKey: 'discovered_by'});
    prisoner.hasMany(contraband, {foreignKey: 'owner'});
    object.hasMany(contraband, {foreignKey: 'object'});
    room.hasMany(program, {foreignKey: 'room'});
    program.belongsToMany(prisoner, {
        through: prisonerProgram,
        foreignKey: 'program'
    });
    prisoner.belongsToMany(program, {
        through: prisonerProgram,
        foreignKey: 'prisoner'
    });
    prisoner.hasMany(reputationPrisoner, {foreignKey: 'prisoner'});
    reputation.hasMany(reputationPrisoner, {foreignKey: 'reputation'});
    thingType.hasMany(object, {foreignKey: 'thing_type'});
    thingType.hasMany(inventoryContents, {foreignKey: 'thing_type'});
    inventory.hasMany(inventoryContents, {foreignKey: 'inventory'});

    // synchronize
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

    return db;
};
