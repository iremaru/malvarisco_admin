
module.exports = (sequelize, Sequelize) => {
    const specie = require('./vegetableSpecie.model.js');
    const vegetableSpecieType = sequelize.define(
        'vegetableSpecieType', {
            specieID: {
                type: Sequelize.INTEGER,
                field: 'specie_id',
                allowNull: false,
                /* references: {
                    model: specie,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL' */
            },
            name: {
                type: Sequelize.STRING,
            }
        }
    );
    
    return vegetableSpecieType;
};