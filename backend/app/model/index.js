const dbConfig = require('../../config/db.config');
const Sequelize = require('sequelize');

const orm = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {
    Sequelize: Sequelize,
    sequelize: orm,
    vegetableParts: require("./vegetablePart.model.js")(orm, Sequelize),
    vegetableSpecies: require("./vegetableSpecie.model.js")(orm, Sequelize),
    vegetableSpecieTypes: require("./vegetableSpecieType.model.js")(orm, Sequelize),
    vegetables: require("./vegetable.model.js")(orm, Sequelize),
    users: require("./user.model.js")(orm, Sequelize),
};

/* db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.vegetables = require("./vegetable.model.js")(sequelize, Sequelize);
db.vegetableParts = require("./vegetablePart.model.js")(sequelize, Sequelize);
*/

module.exports = db;