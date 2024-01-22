const router = require("express").Router();
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(controller.listAllUses)
    .all(methodNotAllowed);

router.route("/:useId")
    .get(controller.readUse)
    .delete(controller.deleteUse)
    .all(methodNotAllowed);

module.exports = router;