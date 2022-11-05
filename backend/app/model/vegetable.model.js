
module.exports = (sequelize, Sequelize) => {
    const SpecieType = require('./vegetableSpecieType.model');
    const vegetable = sequelize.define( 'vegetable', {
            specieTypeID: {
                field: 'specie_type_id',
                type: Sequelize.INTEGER,
                allowNull: false,
                /* references: {
                    model: SpecieType,
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL' */
            },
            vegetablePartID: {
                type: Sequelize.INTEGER,
            },
            description: {
                type: Sequelize.CHAR,
            },
            imageName: {
                type: Sequelize.STRING,

            }
        }
    );

    return vegetable;
};

