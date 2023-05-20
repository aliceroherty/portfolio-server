const express = require('express');
const jwt = require('jsonwebtoken');
const Token = require('../models/token');

const router = express.Router();

const generateAccessToken = (apiKey) => {
	return jwt.sign({ apiKey }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '5m',
	});
};

router.post('/login', async (req, res) => {
	try {
		const apiKey = req.body.apiKey;

		if (apiKey != process.env.API_KEY) return res.sendStatus(403);

		const accessToken = generateAccessToken(apiKey);
		const refreshToken = jwt.sign(
			{ apiKey },
			process.env.REFRESH_TOKEN_SECRET
		);

		await new Token({
			token: refreshToken,
		}).save();

		res.json({ accessToken, refreshToken });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.post('/refresh', async (req, res) => {
	try {
		const tokens = (await Token.find()).map(({ token }) => token);
		const refreshToken = req.body.token;
		if (refreshToken == null) return res.sendStatus(401);
		if (!tokens.includes(refreshToken)) return res.sendStatus(403);
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

router.delete('/logout', async (req, res) => {
	await Token.deleteOne({ token: req.body.token });
	res.sendStatus(204);
});

module.exports = router;
