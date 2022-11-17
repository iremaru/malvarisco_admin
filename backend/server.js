const express = require("express");
const cors = require('cors');
const db = require('./app/model');
const path = require('path');

const corsOptions = { origin: 'http://localhost:4200' };
const app = express();
const PORT = process.env.PORT || 8088;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    if (req.headers.authorization.indexOf('Basic ') === 0) {
        // verify auth basic credentials
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        req.body.username = username;
        req.body.password = password;

        return next();
    }

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            req.token = token;
            next();
        }
    });
});

let productionMode = true;
process.argv.forEach((val, i, array) => { if (val == 'devmode') productionMode = false; });

console.log((productionMode ? 'PRODUCTION MODE' : 'DEVELOPMENT MODE'));

if (productionMode) {
    db.sequelize.sync().then(() => { console.log("Synced db."); }).catch((err) => { console.log("Failed to sync db: " + err.message); });
} else {
    db.sequelize.sync({ force: true }).then(() => { console.log("Drop and resync db"); });
}

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Malva-Risco app." });
});

require("./app/routes/vegetablePart.routes")(app);
require("./app/routes/vegetable.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(PORT, () => console.log(`Server is running in port ${PORT}.`));