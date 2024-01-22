const uses = require("../data/uses-data");

// ROUTE HANDLERS

function listAllUses(req, res) {
    res.json({data: uses});
}

function readUse(req, res) {
    res.json({data: res.locals.use});
}

function deleteUse(req, res) {
    const {useId} = req.params;
    const index = uses.findIndex((use) => use.id === Number(useId));
    const deletedUse = uses.splice(index, 1);
    res.sendStatus(204);
}

// VALIDATION MIDDLEWARE

function useExists(req, res, next) {
    const {useId} = req.params;
    const foundUse = uses.find((use) => use.id === Number(useId));

    if (foundUse) {
        res.locals.use = foundUse;
        next();
    }
    next({status: 404, message: `Requested use ${useId} not found.`});
}

module.exports = {
    listAllUses,
    readUse: [useExists, readUse],
    deleteUse: [useExists, deleteUse],
}