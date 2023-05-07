const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.CONNECTION_STRING);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

app.use(express.json());

const projectRouter = require('./routes/projects');
app.use('/projects', projectRouter);

app.listen(3000, () => console.log('Server listening on port 3000...'));
