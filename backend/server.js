
const express = require("express");
const cors = require('cors');

const corsOptions = { origin: 'http://localhost:4200'};
const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( cors( corsOptions ) );

const db = require('./app/model');
//const productionMode = true;


let productionMode = true;
process.argv.forEach( (val, i, array) => { if( val  == 'devmode' ) productionMode = false; });

console.log( (productionMode? 'PRODUCTION MODE' : 'DEVELOPMENT MODE') );

if( productionMode ) {
    db.sequelize.sync().then(() => { console.log("Synced db.");}).catch( (err) => { console.log("Failed to sync db: " + err.message); } );
} else {
    db.sequelize.sync( {force: true} ).then( () => { console.log("Drop and resync db"); } );
}

app.get('/', (req, res) => {
    res.json( { message: "Welcome to Malva-Risco app." } );
} );

require("./app/routes/vegetablePart.routes")(app);

const PORT = process.env.PORT || 8088;
app.listen( PORT, () => console.log( `Server is running in port ${PORT}.` ) );