var Appointment = require('../models/appointment')
var Patient = require('../models/patient')
var async = require('async')

exports.query_appointment = function (req, res, next) {
    Appointment.find()
        .sort([['time', 'ascending']])
        .exec(function (err, list_appointments) {
            if (err) { return next(err); }
            res.render('appointment_list', { title: 'Appointment List', appointment_list: list_appointments });
        })
};

exports.appointment_create = function (req, res, next) {
    console.log(req);
    if(undefined===req.query.patientid){
        Patient.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_patients) {
            if (err) { return next(err); }
            res.render('appointment_form', { title: 'Create Appointment', patient_list: list_patients });
        })

    }
    else{
        Patient.findById(req.query.patientid, function (err, patient) {
            if (err) { return next(err); }
            if (patient == null) { // No results.
                var err = new Error('Patient not found');
                err.status = 404;
                return next(err);
            }
            var list_patients = [];
            list_patients.push(patient);
            res.render('appointment_form', { title: 'Create Appointment', patient_list: list_patients });
        });
    }    
};

exports.appointment_update = function (req, res, next) {
    Appointment.findById(req.params.id, function (err, appointment) {
        if (err) { return next(err); }
        if (appointment == null) { // No results.
            var err = new Error('Appointment not found');
            err.status = 404;
            return next(err);
        }
        Patient.findById(appointment.pid, function (err, patient) {
            if (err) { return next(err); }
            if (patient == null) { // No results.
                var err = new Error('Patient not found');
                err.status = 404;
                return next(err);
            }  
            var list_patients = [];
            list_patients.push(patient);          
            res.render('appointment_form', { title: 'Update Appointment', appointment : appointment , patient_list: list_patients});
        });
    });
};

exports.new_appointment = function (req, res, next) {
    var appointment = new Appointment(
        {
            pid: req.body.pid,
            time: req.body.time,
            notes: req.body.notes            
        });
    appointment.save(function (err) {
        if (err) { return next(err); }
        res.redirect(appointment.url);
    });
};

exports.get_appointment = function (req, res, next) {
    async.parallel({
        appointment: function (callback) {
            Appointment.findById(req.params.id)
                .exec(callback)
        }       
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.appointment == null) { // No results.
            var err = new Error('Appointment not found');
            err.status = 404;
            return next(err);
        }
        Patient.findById(results.appointment.pid, function (err, patient) {
            if (err) { return next(err); }
            if (patient == null) { // No results.
                var err = new Error('Patient not found');
                err.status = 404;
                return next(err);
            }            
            res.render('appointment_detail', { title: 'Appointment Detail', appointment : results.appointment , patient : patient});
        });
             
    });
};

exports.update_appointment = function (req, res, next) {
    var appointment = new Appointment(
        {
            pid: req.body.pid,
            time: req.body.time,
            notes: req.body.notes,
            _id: req.params.id
        });
        Appointment.findByIdAndUpdate(req.params.id, appointment, {}, function (err, nappointment) {
            if (err) { return next(err); }
            res.redirect(appointment.url);
        });
};

exports.delete_appointment = function (req, res, next) {
    async.parallel({
        appointment: function (callback) {
            Appointment.findById(req.params.id)
                .exec(callback)
        }       
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.appointment == null) { // No results.
            var err = new Error('Appointment not found');
            err.status = 404;
            return next(err);
        }
        Patient.findById(results.appointment.pid, function (err, patient) {
            if (err) { return next(err); }
            if (patient == null) { // No results.
                var err = new Error('Patient not found');
                err.status = 404;
                return next(err);
            }            
            Appointment.findByIdAndRemove(req.params.id, function deleteAppointment(err) {
                if (err) { return next(err); }
                res.redirect(patient.url);
            });
        });             
    });    
};