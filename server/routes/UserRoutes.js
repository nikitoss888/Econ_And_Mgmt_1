const { Router } = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middleware/AuthMiddleware');

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/auth', auth, UserController.auth);

module.exports = router;