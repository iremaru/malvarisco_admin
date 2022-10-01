module.exports = app => {
    const vegetableParts = require("../controller/vegetablePart.controller");

    let router = require("express").Router();

    router.post("/", vegetableParts.create);
    router.get("/", vegetableParts.findAll);
    router.get("/:id", vegetableParts.findOne);
    router.put("/:id", vegetableParts.update);
    router.delete("/:id", vegetableParts.delete);
    router.delete("/", vegetableParts.deleteAll);

    app.use('/api/vegetableParts', router);
};