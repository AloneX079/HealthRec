const{
    registerHospital,
    loginHospital,
    logoutHospital,
    getCurrentHosp,
    getPendingApproval,
    approveDoctor

}= require('../controllers/hospital.controller.js');
const {verifyHJWT} = require('../middlewares/hosp.mw.js')

const Router = require('express').Router
const router = Router()

router.route('/hreg').post(registerHospital)
router.route('/hlog').post(loginHospital)
router.route('/hout').post(verifyHJWT, logoutHospital)
router.route('/happdoc').post(verifyHJWT, approveDoctor)

router.route('/get-hosp').get(verifyHJWT, getCurrentHosp)
router.route('/pendingapp').get(verifyHJWT, getPendingApproval)


module.exports = router