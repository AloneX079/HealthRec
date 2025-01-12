const {
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
  getPatientInfo,
  getPresPhar,
  upVisitHistory,
  getPendingResult,
} = require("../controllers/record.controller.js");
const { verifyJWT } = require("../middlewares/auth.mw.js");

const Router = require("express").Router;
const router = Router();

router.route("/getbasicinf").get(verifyJWT, getBasicInfo);
router.route("/getmedhist").get(verifyJWT, getMedicalHistory);
router.route("/getvitals").get(verifyJWT, getVitals);
router.route("/getinsinfo").get(verifyJWT, getInsuranceInfo);
router.route("/getemercont").get(verifyJWT, getEmergencyContact);
router.route("/getvishist").get(verifyJWT, getVisitHistory);
router.route("/getplist").get(verifyJWT, getPatientList);
router.route("/getpendres").get(verifyJWT, getPendingResult);

router.route("/getpresphar").post(verifyJWT, getPresPhar);
router.route("/upbasicinf").post(verifyJWT, upBasicInfo);
router.route("/upmedhist").post(verifyJWT, upMedicalHistory);
router.route("/upvitals").post(verifyJWT, upPatientVitals);
router.route("/upvishist").post(verifyJWT, upVisitHistory);
router.route("/getdocpinf").post(verifyJWT, getPatientInfo);

// router.route('/getdocmedhist').post(verifyJWT,getPatientMedicalHistory)
// router.route('/getdocvitals').post(verifyJWT,getPatientVitals)
// router.route('/getdocinsinfo').post(verifyJWT,getPatientInsuranceInfo)
// router.route('/getdocemercont').post(verifyJWT,getPatientEmergencyContact)
// router.route('/getdocvishist').post(verifyJWT,getPatientVisitHistory)
// router.route('/upinsinfo').post(verifyJWT,upInsuranceInfo)
// router.route('/upemercont').post(verifyJWT,upEmergencyContact)

module.exports = router;
