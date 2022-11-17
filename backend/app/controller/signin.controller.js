const jwt = require('jsonwebtoken');
const auth = require('../shared/auth');
const bcrypt = require('bcryptjs');

const User = require("../model").user;

exports.signin = (req, res) => {
    const user = req.body.username;
    const pwd = req.body.password;

    if (!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password required."
        });
    }

    User.findOne({ where: { username: user } })
        .then(data => {
            const result = bcrypt.compareSync(pwd, data.password);
            if (!result) return res.status(401).send('Password not valid!');

            const token = auth.generateToken(data);
            const userObj = auth.getCleanUser(data);
            return res.json({ user: userObj, access_token: token });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user."
            });
        });
};

exports.isAuthenticated = (req, res, next) => {
    // check header or url parameters or post parameters for token
    // var token = req.body.token || req.query.token;
    var token = req.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }
    // check token that was passed by decoding token using secret
    // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });

        User.findByPk(user.id)
            .then(data => {
                // return 401 status if the userId does not match.
                if (!user.id) {
                    return res.status(401).json({
                        error: true,
                        message: "Invalid user."
                    });
                }
                // get basic user details
                next();
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving User with id=" + id
                });
            });
    });
};