const express = require('express');
const resources = require('./routes/resources');

const router = express.Router();

router.use('/resources', resources);

module.exports = router;
