module.exports = app => {
    const users = require('../controller/user.controller');
    const signin = require('../controller/signin.controller');
    const router = require("express").Router();

    router.post("/", users.create);
    router.get("/", signin.isAuthenticated, users.findAll);
    router.get("/:id", signin.isAuthenticated, users.findOne);
    router.put("/:id", signin.isAuthenticated, users.update);
    router.post("/signin", signin.signin);
    // router.delete("/:id", users.delete);
    // router.delete("/", users.deleteAll);

    app.use('/api/users', router);
};