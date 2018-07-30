var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var PatientSchema = new Schema(
    {
    first_name: {type: String, required: true,  max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: { type: Date, required: true },
    gender: {type: String, enum: ["male", "female"] },
    address:{type: String},
    city:{type: String},
    state:{type: String},
    pincode:{type: Number},
    phone:{type : String},
    home_phone: {type : String},
    email: {type : String , match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    marital_status : {type: String, enum: ["unknown" , "unmarried", "married"]},
    emergency_contat: {
      name : {type : String},
      phone : {type : String}
    },
    insurance :{
      name : {type : String},
      address : {type : String},
      id : {type : String},
      notes : {type : String}
    }
    }
  );

// Virtual for Patient "full" name.
PatientSchema
.virtual('name')
.get(function () {
  return this.family_name +', '+this.first_name;
});

PatientSchema
.virtual('url')
.get(function () {
  return '/doctor/patient/'+this._id
});

PatientSchema
.virtual('date_of_birth_yyyy_mm_dd')
.get(function () {
  return moment(this.date_of_birth).format('YYYY-MM-DD');
});

PatientSchema
.virtual('date_of_birth_yyyy_mmm_dd')
.get(function () {
  return moment(this.date_of_birth).format('MMMM Do YYYY');
});

PatientSchema
.virtual('age')
.get(function () {
  return null===this.date_of_birth ? 'UnKnown' : Math.floor((Date.now() - this.date_of_birth.getTime()) / (1000 * 3600 * 24 * 365));;
});

// Export model.
module.exports = mongoose.model('Patient', PatientSchema);
