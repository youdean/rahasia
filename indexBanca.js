import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

var app = express();
// const swaggerUi = require('swagger-ui-express');
// const openApiDocumentation = require('./openApiDocumentation.yml');
// global.__basedir = __dirname;

const port = 3001;

import { router as illustrationRouter } from './api/illustration.js';
import { router as swaggerRouter } from './api/swagger.js';


// var jsyaml = require('js-yaml');
// var spec = fs.readFileSync('openApiDocumentation.yml', 'utf8');
// var swaggerDocument = jsyaml.safeLoad(spec);

// var rootScopeModuleUOB = require(__basedir + '/rootScopeUOB');

// var mappingCode = {};



// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());

app.use('/', illustrationRouter);
app.use('/', swaggerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
app.use(function (err, req, res, next) {
    console.error(`Error catched! ${err}`);

    const error = {
        status: err.status || 500,
        message: err.message,
    };

    res.status(error.status).send(error);
});

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

function onListening() {
    const addr = app.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('\nListening on ' + bind);
}

app.listen(port);
app.on('error', onError);
app.on('listening', onListening);

console.log('Server started on port ' + port);

