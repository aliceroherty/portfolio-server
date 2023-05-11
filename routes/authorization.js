const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Refresh tokens should be stored in db collection in prod
let refreshTokens = [];

const generateAccessToken = (apiKey) => {
	return jwt.sign({ apiKey }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '5m',
	});
};

router.post('/login', (req, res) => {
	try {
		const apiKey = req.body.apiKey;
		const accessToken = generateAccessToken(apiKey);
		const refreshToken = jwt.sign(
			{ apiKey },
			process.env.REFRESH_TOKEN_SECRET
		);
		refreshTokens.push(refreshToken);
		res.json({ accessToken, refreshToken });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post('/refresh', (req, res) => {
	try {
		const refreshToken = req.body.token;
		if (refreshToken == null) return res.sendStatus(401);
		if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			(error, apiKey) => {
				if (error) return res.sendStatus(403);
				const accessToken = generateAccessToken(apiKey.apiKey);
				res.json({ accessToken });
			}
		);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
module.exports = router;
