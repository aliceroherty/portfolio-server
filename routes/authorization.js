const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', (req, res) => {
	try {
		const apiKey = req.body.apiKey;
		const accessToken = jwt.sign(
			{ apiKey },
			process.env.ACCESS_TOKEN_SECRET
		);
		res.json({ accessToken });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
