const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	githubUrl: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Project', projectSchema, 'projects')
