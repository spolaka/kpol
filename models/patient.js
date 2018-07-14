var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var PatientSchema = new Schema(
    {
    first_name: {type: String, required: true,  max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: { type: Date },
    gender: {type: String, enum: ["male", "female"] },
    address:{type: String},
    city:{type: String},
    state:{type: String},
    pincode:{type: Number},
    phone:{type : String},
    home_phone: {type : String},
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

// Export model.
module.exports = mongoose.model('Patient', PatientSchema);
