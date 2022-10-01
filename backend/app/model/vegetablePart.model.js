module.exports = (sequelize, Sequelize) => {

    const vegetablePart = sequelize.define(
        'vegetablePart', {
            name: {
                type: Sequelize.CHAR,
            },
            description: {
                type: Sequelize.CHAR,
            },
            examples: {
                type: Sequelize.CHAR,
            },
            
        }
    );
    
    return vegetablePart;
};