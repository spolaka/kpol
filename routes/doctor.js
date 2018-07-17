var express = require('express');
var router = express.Router();


// Require our controllers.
var doctor_controller = require('../controllers/doctorController'); 
var patient_controller = require('../controllers/patientController'); 
var appointment_controller = require('../controllers/appointmentController');
var medicaltest_controller = require('../controllers/medicaltestController');

router.get('/', doctor_controller.index);

router.get('/patient/create', patient_controller.patient_create);
router.post('/patient/create', patient_controller.new_patient);
router.get('/patient/:id/update', patient_controller.patient_update);
router.post('/patient/:id/update', patient_controller.update_patient);
router.get('/patient', patient_controller.query_patient);
router.get('/patient/:id', patient_controller.get_patient);


router.get('/appointment/create', appointment_controller.appointment_create);
router.post('/appointment/create', appointment_controller.new_appointment);
router.get('/appointment/:id/update', appointment_controller.appointment_update);
router.post('/appointment/:id/update', appointment_controller.update_appointment);
router.get('/appointment', appointment_controller.query_appointment);
router.get('/appointment/:id', appointment_controller.get_appointment);
router.get('/appointment/:id/delete', appointment_controller.delete_appointment);


router.get('/medicaltest/create', medicaltest_controller.medicaltest_create);
router.post('/medicaltest/create', medicaltest_controller.new_medicaltest);
router.get('/medicaltest/:id/update', medicaltest_controller.medicaltest_update);
router.post('/medicaltest/:id/update', medicaltest_controller.update_medicaltest);
router.get('/medicaltest', medicaltest_controller.query_medicaltest);
router.get('/medicaltest/:id', medicaltest_controller.get_medicaltest);
router.get('/medicaltest/:id/delete', medicaltest_controller.delete_medicaltest);


module.exports = router;
