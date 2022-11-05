module.exports = (sequelize, Sequelize) => {

    const vegetable = sequelize.define(
        'vegetable', {
            specieTypeID: {
                type: Sequelize.INTEGER,
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