const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user-controller');

router.get('/test', userController.user_test);
router.post('/register', userController.user_register);
router.post('/login', userController.user_login);
router.delete('/delete', auth, userController.user_delete);
router.post('/tokenIsValid', userController.user_is_token_valid);
router.get('/userInfo', auth, userController.user_get_info);

module.exports = router;