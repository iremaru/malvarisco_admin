const models = require("../model");
const vegetableModel = models.vegetables;

exports.create = (req, res) => {
    if(!req.body.description) {
        res.status(404).send({ message: 'Content can\'t be empty.'});
        return;
    }

    const vegetable = {
        specieTypeID: req.body.specieTypeID,
        vegetablePartID: req.body.vegetablePartID,
        description: req.body.description,
        imageName: req.file? req.file.filename : '',
    };

    vegetableModel.create(vegetable)
        .then( data => {
            res.send( data );
        })
        .catch( err => {
            res.status( 500 ).send({
                message: err.message || "Some error occurred while creating the vegetable part"
            });
        });
}

exports.findAll = (req, res) => {

    vegetableModel.findAll( )
        .then( data => {
            res.send( data );
        } )
        .catch( err => {
            res.status( 500 ).send( {
                message: "Some error ocurred while retrieving vegetables."
            });
        } );
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    vegetableModel.findByPk(id)
        .then( data => {
            if( data ) {
                res.send(data);
            } else {
                res.status( 404 ).send({
                message: `Cannot find vegetable with id=${id}.`
            });
        }
    })
    .catch( err => {
        res.status( 500 ).send({
        message: "Error retrieving vegetable with id=" + id
        });
    });
};
exports.update = (req, res) => {
    const id = req.params.id;

    vegetableModel.update( req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Vegetable was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update vegetable with id=${id}. Maybe vegetable was not found or req.body is empty!`
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

    vegetableModel.destroy({
        where: { id: id }
    }).then( num => {
        if (num == 1) {
            res.send({
                message: "Vegetable was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete vegetable with id=${id}. Maybe vegetable was not found!`
            });
        }
    }).catch( err => {
        res.status( 500 ).send({
            message: "Could not delete vegetable part with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    vegetableModel.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} vegetable were deleted successfully!` });
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all vegetables."
            });
        });
};