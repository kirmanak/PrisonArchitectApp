const Sequelize = require('sequelize');

module.exports = (config) => {
    // db synchronization
    // noinspection Annotator
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
    program.belongsTo(room, { foreignKey: 'room_fk' });
    room.belongsTo(access, { foreignKey: 'access_fk'});
    access.hasMany(room, {foreignKey: 'access_fk'});
    access.belongsToMany(regime, {
        through: accessRegime,
        foreignKey: 'access_fk'
    });
    regime.belongsToMany(access, {
        through: accessRegime,
        foreignKey: 'regime_fk'
    });
    prisoner.belongsTo(regime, { foreignKey: 'regime_fk'});
    prisoner.belongsToMany(program, {
        through: prisonerProgram,
        foreignKey: 'prisoner_fk',
    });
    program.belongsToMany(prisoner, {
        through: prisonerProgram,
        foreignKey: 'program_fk'
    });
    prisoner.belongsToMany(reputation, {
        through: reputationPrisoner,
        foreignKey: 'prisoner_fk'
    });
    reputation.belongsToMany(prisoner, {
        through: reputationPrisoner,
        foreignKey: 'reputation_fk'
    });

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
