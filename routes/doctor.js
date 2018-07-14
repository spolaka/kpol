var express = require('express');
var router = express.Router();


// Require our controllers.
var patient_controller = require('../controllers/patientController'); 
var appointment_controller = require('../controllers/appointmentController');
var medicaltest_controller = require('../controllers/medicaltestController');


router.get('/patient', patient_controller.query_patient);
router.post('/patient', patient_controller.new_patient);
router.get('/patient/:id', patient_controller.get_patient);
router.put('/patient/:id', patient_controller.update_patient);


router.get('/appointment', appointment_controller.query_appointment);
router.post('/appointment', appointment_controller.new_appointment);
router.get('/appointment/:id', appointment_controller.get_appointment);
router.put('/appointment/:id', appointment_controller.update_appointment);
router.delete('/appointment/:id', appointment_controller.delete_appointment);


router.get('/medicaltest', medicaltest_controller.query_medicaltest);
router.post('/medicaltest', medicaltest_controller.new_medicaltest);
router.get('/medicaltest/:id', medicaltest_controller.get_medicaltest);
router.put('/medicaltest/:id', medicaltest_controller.update_medicaltest);


module.exports = router;
