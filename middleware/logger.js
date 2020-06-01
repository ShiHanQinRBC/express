
 const moment = require('moment');

// This is a middleware; every time we make a request, this middleware is run
 // middleware has access to req and res
 const logger = (req, res, next) => {
     console.log(`${req.protocol}://${req.get('host')}${
         req.originalUrl
        }: ${moment().format()}`);
     next();
 };

 module.exports = logger;
