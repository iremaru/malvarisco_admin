

module.exports = app => {
    const imageUploader = require('../middlewares/imageUploader');
    const vegetables = require('../controller/vegetable.controller');
    const router = require("express").Router();

    router.post("/", imageUploader.single('file'), vegetables.create);
    router.get("/", vegetables.findAll);
    /*
    router.get("/:id", vegetableParts.findOne);
    router.put("/:id", vegetableParts.update);
    router.delete("/:id", vegetableParts.delete);
    router.delete("/", vegetableParts.deleteAll); */

    app.use('/api/vegetables', router);
};