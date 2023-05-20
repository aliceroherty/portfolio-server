const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const app = express();

mongoose.connect(process.env.CONNECTION_STRING);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));

app.use(
	cors({
		origin: '*',
		credentials: true,
		optionSuccessStatus: 200,
	})
);

app.use(express.json());

const projectRouter = require('./routes/projects');
app.use('/projects', projectRouter);

const authorizationRouter = require('./routes/authorization');
app.use('/auth', authorizationRouter);

app.use('/images', express.static('images'));

app.listen(process.env.PORT, () =>
	console.log(`Server listening on port ${process.env.PORT}...`)
);
