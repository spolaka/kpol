var Medicaltest = require('../models/medicaltest')
var Patient = require('../models/patient')
var async = require('async')

exports.query_medicaltest = function (req, res, next) {
    Medicaltest.find()
        .sort([['time', 'ascending']])
        .exec(function (err, list_medicaltests) {
            if (err) { return next(err); }
            res.render('medicaltest_list', { title: 'Medicaltest List', medicaltest_list: list_medicaltests });
        })
};

exports.medicaltest_create = function (req, res, next) {
    console.log(req);
    if(undefined===req.query.patientid){
        Patient.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_patients) {
            if (err) { return next(err); }
            res.render('medicaltest_form', { title: 'Create Medicaltest', patient_list: list_patients });
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
            res.render('medicaltest_form', { title: 'Create Medicaltest', patient_list: list_patients });
        });
    }    
};

exports.medicaltest_update = function (req, res, next) {
    Medicaltest.findById(req.params.id, function (err, medicaltest) {
        if (err) { return next(err); }
        if (medicaltest == null) { // No results.
            var err = new Error('Medicaltest not found');
            err.status = 404;
            return next(err);
        }
        Patient.findById(medicaltest.pid, function (err, patient) {
            if (err) { return next(err); }
            if (patient == null) { // No results.
                var err = new Error('Patient not found');
                err.status = 404;
                return next(err);
            }  
            var list_patients = [];
            list_patients.push(patient);          
            res.render('medicaltest_form', { title: 'Update Medicaltest', medicaltest : medicaltest , patient_list: list_patients});
        });
    });
};

exports.new_medicaltest = function (req, res, next) {
    var medicaltest = new Medicaltest(
        {
            pid: req.body.pid,
            time: req.body.time,
            notes: req.body.notes            
        });
    medicaltest.save(function (err) {
        if (err) { return next(err); }
        res.redirect(medicaltest.url);
    });
};

exports.get_medicaltest = function (req, res, next) {
    async.parallel({
        medicaltest: function (callback) {
            Medicaltest.findById(req.params.id)
                .exec(callback)
        }       
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.medicaltest == null) { // No results.
            var err = new Error('Medicaltest not found');
            err.status = 404;
            return next(err);
        }
        Patient.findById(results.medicaltest.pid, function (err, patient) {
            if (err) { return next(err); }
            if (patient == null) { // No results.
                var err = new Error('Patient not found');
                err.status = 404;
                return next(err);
            }            
            res.render('medicaltest_detail', { title: 'Medicaltest Detail', medicaltest : results.medicaltest , patient : patient});
        });
             
    });
};

exports.update_medicaltest = function (req, res, next) {
    var medicaltest = new Medicaltest(
        {
            pid: req.body.pid,
            time: req.body.time,
            notes: req.body.notes,
            _id: req.params.id
        });
        Medicaltest.findByIdAndUpdate(req.params.id, medicaltest, {}, function (err, nmedicaltest) {
            if (err) { return next(err); }
            res.redirect(medicaltest.url);
        });
};

exports.delete_medicaltest = function (req, res, next) {
    async.parallel({
        medicaltest: function (callback) {
            Medicaltest.findById(req.params.id)
                .exec(callback)
        }       
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.medicaltest == null) { // No results.
            var err = new Error('Medicaltest not found');
            err.status = 404;
            return next(err);
        }
        Patient.findById(results.medicaltest.pid, function (err, patient) {
            if (err) { return next(err); }
            if (patient == null) { // No results.
                var err = new Error('Patient not found');
                err.status = 404;
                return next(err);
            }            
            Medicaltest.findByIdAndRemove(req.params.id, function deleteMedicaltest(err) {
                if (err) { return next(err); }
                res.redirect(patient.url);
            });
        });             
    });    
};