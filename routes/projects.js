const express = require('express');
const Project = require('../models/project');
const authenticateToken = require('../middleware/authentication');

const router = express.Router();

const getProject = async (req, res, next) => {
	let project;

	try {
		project = await Project.findById(req.params.id);

		if (project == null) {
			return res.status(404).json({ message: 'Project not found' });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}

	res.project = project;
	next();
};

// Read all projects
router.get('/', authenticateToken, async (req, res) => {
	try {
		res.json(await Project.find());
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Read project by id
router.get('/:id', authenticateToken, getProject, (req, res) => {
	res.json(res.project);
});

// Create project
router.post('/', authenticateToken, async (req, res) => {
	const project = new Project({
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		githubUrl: req.body.githubUrl,
		description: req.body.description,
	});

	try {
		const newProject = await project.save();
		res.status(201).json(newProject);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Update project
router.patch('/:id', authenticateToken, getProject, async (req, res) => {
	if (req.body.title != null) res.project.title = req.body.title;

	if (req.body.imageUrl != null) res.project.imageUrl = req.body.imageUrl;

	if (req.body.githubUrl != null) res.project.githubUrl = req.body.githubUrl;

	if (req.body.description != null)
		res.project.description = req.body.description;

	try {
		const updatedProject = await res.project.save();
		res.json(updatedProject);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Delete project
router.delete('/:id', authenticateToken, getProject, async (req, res) => {
	try {
		await res.project.deleteOne();
		res.json({ message: 'Deleted project' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
