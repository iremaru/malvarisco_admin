// generate token using secret from process.env.JWT_SECRET
const jwt = require('jsonwebtoken');

// generate token and return it
function generateToken(user) {
    if (!user) return null;

    const u = {
        id: user.id,
        username: user.username,
        password: user.password
    };

    return jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

// return basic user details
function getCleanUser(user) {
    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin,
        password: user.password
    };
}

module.exports = {
    generateToken,
    getCleanUser
}