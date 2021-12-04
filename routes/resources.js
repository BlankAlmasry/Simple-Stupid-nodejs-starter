const express = require('express');

const router = express.Router();
const resources = require('../controllers/resources');

router.get('/', resources.getAll);
router.get('/:name', resources.getOne);
router.post('/', resources.create);
router.patch('/:name', resources.update);
router.delete('/:name', resources.deleteOne);

module.exports = router;
