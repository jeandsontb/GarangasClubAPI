import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';

import './src/database/connection';
import routes from './src/routes';
import errorHandler from './src/errors/handler';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorHandler);

app.listen();


// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It` is works Jeandson!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();
