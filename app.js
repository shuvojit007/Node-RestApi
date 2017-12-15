const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');


//db cn
mongoose.connect('mongodb://localhost/apipro', { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

//Helmet helps you secure your Express apps by
// setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());
const cars = require('./routes/cars');
const users = require('./routes/users');
//middleewares
// for http req logger
app.use(morgan('dev'));

//parse the body or params from req
app.use(bodyParser.json());

//Routes
app.use('/users', users);
app.use('/cars', cars);

//catch 404 Errors and forward them to error handeler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error handler funciton
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //Respond to  client 
    res.status(status).json({
        error: {
            message: error.message
        }
    });
});




//start  the server 
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Magic is happeing on port ${port}`))