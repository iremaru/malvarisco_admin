const db = require("../model");

const vegetablePartDB = db.vegetableParts;
const op = db.Sequelize.Op;

/***
 * Create and Save a new vegetable part
 */
exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(404).send({ message: 'Content can\'t be empty.'});
        return;
    }

    const vegetablePart = {
        name: req.body.name,
        description: req.body.description,
        examples: req.body.examples,
    };

    vegetablePartDB.create(vegetablePart)
        .then( data => {
            res.send( data );
        })
        .catch( err => {
            res.status( 500 ).send({
                message: err.message || "Some error occurred while creating the vegetable part"
            });
        });
};
exports.findAll = (req, res) => {

    vegetablePartDB.findAll( )
        .then( data => {
            res.send( data );
        } )
        .catch( err => {
            res.status( 500 ).send( {
                message: "Some error ocurred while retrieving vegetable parts."
            });
        } );
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    vegetablePartDB.findByPk(id)
        .then( data => {
            if( data ) {
                res.send(data);
            } else {
                res.status( 404 ).send({
                message: `Cannot find vegetable part with id=${id}.`
            });
        }
    })
    .catch( err => {
        res.status( 500 ).send({
        message: "Error retrieving vegetable part with id=" + id
        });
    });
};
exports.update = (req, res) => {
    const id = req.params.id;

    vegetablePartDB.update( req.body, {
        where: { id: id }
    }).then( num => {
        if (num == 1) {
            res.send({
                message: "Vegetable part was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update vegetable part with id=${id}. Maybe vegetable part was not found or req.body is empty!`
            });
        }
    }).catch( err => {
        res.status( 500 ).send({
            message: "Error updating vegetable part with id=" + id
        });
    });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    vegetablePartDB.destroy({
        where: { id: id }
    }).then( num => {
        if (num == 1) {
            res.send({
                message: "Vegetable part was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete vegetable part with id=${id}. Maybe vegetable part was not found!`
            });
        }
    }).catch( err => {
        res.status( 500 ).send({
            message: "Could not delete vegetable part with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    vegetablePartDB.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} vegetable parts were deleted successfully!` });
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all vegetable parts."
            });
        });
};