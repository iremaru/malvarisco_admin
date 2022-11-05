
module.exports = app => {
    const imageUploader = require('../middlewares/imageUploader');
    const vegetables = require('../controller/vegetable.controller');
    const router = require("express").Router();

    router.post("/", imageUploader.single('file'), vegetables.create);
    router.get("/", vegetables.findAll);
    router.get("/:id", vegetables.findOne);
    router.put("/:id", imageUploader.single('file'), vegetables.update);
    router.delete("/:id", vegetables.delete);
    router.delete("/", vegetables.deleteAll);

    app.use('/api/vegetables', router);
};