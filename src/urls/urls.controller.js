const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

// ROUTE HANDLERS

function listUrls(req, res) {
    res.json({data: urls});
}

function readUrl(req, res) {
    const url = res.locals.url;
    const newUse = {
        id: urls.length + 1,
        urlId: url.id,
        time: Date.now(),
    }
    uses.push(newUse);
    res.json({data: res.locals.url});
}

function createUrl(req, res) {
    const {data: {href} = {}} = req.body;
    const newUrl ={
        id: urls.length + 1,
        href,
    }

    urls.push(newUrl);
    res.status(201).json({data: newUrl});
}

function updateUrl(req, res) {
    const url = res.locals.url;
    const {data: {href} = {}} = req.body;
    
    // update the url address
    url.href = href;

    res.json({data: url});
}

function listUrlUses(req, res) {
    const url = res.locals.url;
    const urlUses = uses.filter((use) => use.urlId === Number(url.id));

    res.json({data: urlUses})
}

function readUrlUse(req, res, next) {
    const url = res.locals.url;
    const {urlId, useId} = req.params;
    const foundUse = uses.find((use) => use.id === Number(useId));

    if (foundUse) {
        if (Number(foundUse.urlId) !== Number(urlId)) { // TODO - this check does not work
            next({
                status: 404,
                message: `Requested use ${useId} not associated with requested url ${url.id}`
            });
        }
        res.json({data: foundUse});
    }
    next({status: 404, message: `Requested use ${useId} not found.`});
}

function deleteUrlUse(req, res, next) {
    const {useId} = req.params;
    const foundUse = uses.find((use) => use.id === Number(useId));

    if (foundUse) {
        const index = uses.findIndex((use) => use.id === Number(useId));
        const deletedUse = uses.splice(index, 1);
        res.sendStatus(204);
    }
    next({status: 404, message: `Requested use ${useId} not found.`});
}

// VALIDATION MIDDLEWARE

function urlExists(req, res, next) {
    const {urlId} = req.params;
    const foundUrl = urls.find((url) => url.id === Number(urlId));
    if (foundUrl) {
        res.locals.url = foundUrl;
        next();
    }
    next({status: 404, message: `Sorry, the URL ID ${urlId} was not found.`})
}

function bodyHasData(propertyName) {
    return function(req, res, next) {
        const {data = {}} = req.body;
        if (data[propertyName]){
            return next();
        }
        next({status: 400, message: `Must include ${propertyName}`});
    }
}

module.exports = {
    listUrls: listUrls,
    readUrl: [urlExists, readUrl],
    createUrl: [bodyHasData("href"), createUrl],
    updateUrl: [urlExists, bodyHasData("href"), updateUrl],
    listUrlUses: [urlExists, listUrlUses],
    readUrlUse: [urlExists, readUrlUse],
    deleteUrlUse: [urlExists, deleteUrlUse],
};