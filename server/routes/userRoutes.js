const express = require('express');
const user = require('../controllers/usersController');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();
const passport = require('passport')

router.get('/index', user.index);
router.post('/', user.create);
router.put('/:id', validateObjectId, user.update);
router.delete('/:id', validateObjectId, user.delete);

// Session Routes
router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/me',
    failureRedirect : '/'
}));
router.get('/signup', user.signup);
router.get('/logout', user.sessionDestroy);


module.exports = router;