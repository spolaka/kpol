var Patient = require('../models/patient')
var Medicaltest = require('../models/medicaltest')
var Appointment = require('../models/appointment')
var async = require('async')

exports.query_patient = function (req, res, next) {
    Patient.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_patients) {
            if (err) { return next(err); }
            res.render('patient_list', { title: 'Patient List', patient_list: list_patients });
        })
};

exports.patient_create = function (req, res, next) {
    res.render('patient_form', { title: 'Create Patient' });
};

exports.patient_update = function (req, res, next) {

    Patient.findById(req.params.id, function (err, patient) {
        if (err) { return next(err); }
        if (patient == null) { // No results.
            var err = new Error('Patient not found');
            err.status = 404;
            return next(err);
        }
        res.render('patient_form', { title: 'Update Patient', patient: patient });
    });
};

exports.new_patient = function (req, res, next) {
    var patient = new Patient(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            address: req.body.address,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            phone:req.body.phone,
            home_phone:req.body.home_phone,
            marital_status:req.body.marital_status,
            emergency_contat: {
                name:req.body.emergency_contat.name,
                phone:req.body.emergency_contat.phone
            },
            insurance: {
                name:req.body.insurance.name,
                address:req.body.insurance.address,
                id:req.body.insurance.id,
                notes:req.body.insurance.notes
            }
        });
    patient.save(function (err) {
        if (err) { return next(err); }
        res.redirect(patient.url);
    });

};

exports.get_patient = function (req, res, next) {
    async.parallel({
        patient: function (callback) {
            Patient.findById(req.params.id)
                .exec(callback)
        },
        patient_appointments: function (callback) {
            Appointment.find({ 'pid': req.params.id })
                .exec(callback)
        },
        patient_medicaltests: function (callback) {
            Medicaltest.find({ 'pid': req.params.id })
                .exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.patient == null) { // No results.
            var err = new Error('Patient not found');
            err.status = 404;
            return next(err);
        }
        res.render('patient_detail', { title: 'Patient Detail', patient : results.patient , patient_appointments: results.patient_appointments , patient_medicaltests : results.patient_medicaltests });     
    });
};

exports.update_patient = function (req, res, next) {

    var patient = new Patient(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            address: req.body.address,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            phone:req.body.phone,
            home_phone:req.body.home_phone,
            marital_status:req.body.marital_status,
            emergency_contat: {
                name:req.body.emergency_contat.name,
                phone:req.body.emergency_contat.phone
            },
            insurance: {
                name:req.body.insurance.name,
                address:req.body.insurance.address,
                id:req.body.insurance.id,
                notes:req.body.insurance.notes
            },
            _id: req.params.id
        });
    Patient.findByIdAndUpdate(req.params.id, patient, {}, function (err, npatient) {
            if (err) { return next(err); }
            res.redirect(npatient.url);
        });

};
