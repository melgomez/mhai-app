const express = require('express');
const user = require('../controllers/usersController');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();

router.get('/index', user.index);
router.post('/', user.create);
router.put('/:id', validateObjectId, user.update);
router.delete('/:id', validateObjectId, user.delete);


module.exports = router;