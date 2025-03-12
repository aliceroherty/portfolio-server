const express = require('express');
const cors = require('cors');

const router = express.Router();

router.options("/parse", cors(), (req, res) => {
    res.sendStatus(204);
});

module.exports = router;
