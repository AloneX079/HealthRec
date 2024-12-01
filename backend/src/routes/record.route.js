const{
    getBasicInfo,
    getMedicalHistory,
    getVitals,
    getInsuranceInfo,
    getEmergencyContact,
    getVisitHistory,
    upBasicInfo,
    upMedicalHistory,
    upPatientVitals,
    getPatientList,
    getPatientBasicInfo,
    getPatientMedicalHistory,
    getPatientVitals,
    getPatientInsuranceInfo,
    getPatientEmergencyContact,
    getPatientVisitHistory,
    upEmergencyContact,
    getPresPhar,
    upInsuranceInfo
}= require('../controllers/record.controller.js');
const {verifyJWT} = require('../middlewares/auth.mw.js')

const Router = require('express').Router
const router = Router()

router.route('/getbasicinf').get(verifyJWT,getBasicInfo)
router.route('/getmedhist').get(verifyJWT,getMedicalHistory)
router.route('/getvitals').get(verifyJWT,getVitals)
router.route('/getinsinfo').get(verifyJWT,getInsuranceInfo)
router.route('/getemercont').get(verifyJWT,getEmergencyContact)
router.route('/getvishist').get(verifyJWT,getVisitHistory)
router.route('/getplist').get(verifyJWT,getPatientList)
router.route('/getdocbinf').get(verifyJWT,getPatientBasicInfo)
router.route('/getdocmedhist').get(verifyJWT,getPatientMedicalHistory)
router.route('/getdocvitals').get(verifyJWT,getPatientVitals)
router.route('/getdocinsinfo').get(verifyJWT,getPatientInsuranceInfo)
router.route('/getdocemercont').get(verifyJWT,getPatientEmergencyContact)
router.route('/getdocvishist').get(verifyJWT,getPatientVisitHistory)
router.route('/getpresphar').get(verifyJWT,getPresPhar)

router.route('/upbasicinf').post(verifyJWT,upBasicInfo)
router.route('/upmedhist').post(verifyJWT,upMedicalHistory)
router.route('/upvitals').post(verifyJWT,upPatientVitals)
router.route('/upemercont').post(verifyJWT,upEmergencyContact)
router.route('/upinsinfo').post(verifyJWT,upInsuranceInfo)





module.exports = router