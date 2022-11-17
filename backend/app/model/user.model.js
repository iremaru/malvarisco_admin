module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            field: 'user_name',
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return User;
};