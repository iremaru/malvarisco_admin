module.exports = (sequelize, Sequelize) => {

    const vegetableSpecie = sequelize.define(
        'vegetableSpecie', {
            name: {
                type: Sequelize.STRING,
            }
        }
    );
    
    return vegetableSpecie;
};