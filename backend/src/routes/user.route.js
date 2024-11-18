const{
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    getHospitalList,
    getDocApproval,
    getDocQr,
    getPharApproval
} = require('../controllers/user.controller')
const {verifyJWT} = require('../middlewares/auth.mw.js')

const Router = require('express').Router
const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/doc-approval').post(verifyJWT, getDocApproval)
router.route('/doc-qr').post(verifyJWT, getDocQr)
router.route('/phar-approval').post(verifyJWT, getPharApproval)

router.route('/get-user').get(verifyJWT, getCurrentUser)
router.route('/getapprhosp').get(verifyJWT, getHospitalList)


module.exports = router