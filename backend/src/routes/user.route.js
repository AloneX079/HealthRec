const{
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
} = require('../controllers/user.controller');
const {verifyJWT} = require('../middlewares/auth.mw.js');

const Router = require('express').Router;
const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);

router.route('/get-user').get(verifyJWT, getCurrentUser);


module.exports = router;