var Patient = require('../models/patient');
var Appointment = require('../models/appointment');
var Medicaltest = require('../models/medicaltest');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        patient_count: function(callback) {
            Patient.count(callback);
        },
        appointment_count: function(callback) {
            Appointment.count(callback);
        },        
        medicaltest_count: function(callback) {
            Medicaltest.count(callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Patients Data' , error: err, data: results });
    });
};