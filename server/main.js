import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use('/',express.static(path.join(__dirname, './../public')));

app.get('/hello',(req,res)=>{
  return res.send('Hello CodeLab!');
});

app.listen(port,()=>{
  console.log('Express is listening on port',port);
});

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const devPort = 4000;

/*
    Express Codes
*/


if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

app.use(morgan('dev'));
app.use(bodyParser.json());

import mongoose from 'mongoose';
import session from 'express-session';

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));
/* setup routers & static directory */
import api from './routes';
app.use('/api', api);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});
/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
