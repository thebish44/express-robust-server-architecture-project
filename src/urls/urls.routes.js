const router = require("express").Router();
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(controller.listUrls)
    .post(controller.createUrl)
    .all(methodNotAllowed);

router.route("/:urlId")
    .get(controller.readUrl)
    .put(controller.updateUrl)
    .all(methodNotAllowed);

router.route("/:urlId/uses")
    .get(controller.listUrlUses)
    .all(methodNotAllowed);

router.route("/:urlId/uses/:useId")
    .get(controller.readUrlUse)
    .delete(controller.deleteUrlUse)
    .all(methodNotAllowed);

module.exports = router;