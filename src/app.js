const express = require("express");
const urlRouter = require("./urls/urls.routes");
const usesRouter = require("./uses/uses.routes");

const app = express();

app.use(express.json());
app.use("/urls", urlRouter);
app.use("/uses", usesRouter);

app.use((req, res, next) => {
    next({status: 404, message: `Not Found: ${req.originalUrl}`});
});

app.use((err, req, res, next) => {
//    console.error(err);
   const {status = 500, message = "Something went wrong!"} = err;
   res.status(status).json({error: message});
});

module.exports = app;