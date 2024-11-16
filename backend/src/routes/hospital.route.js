const{
    registerHospital,
    loginHospital,
    logoutHospital,
    getCurrentHosp

}= require('../controllers/hospital.controller.js');
const {verifyHJWT} = require('../middlewares/hosp.mw.js')

const Router = require('express').Router
const router = Router()

router.route('/hreg').post(registerHospital)
router.route('/hlog').post(loginHospital)
router.route('/hout').post(verifyHJWT, logoutHospital)

router.route('/get-hosp').get(verifyHJWT, getCurrentHosp)


module.exports = router