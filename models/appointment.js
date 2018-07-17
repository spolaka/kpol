var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
  pid: {type : String , required: true , max: 40 },
  time: { type: Date , required: true},
  notes: {type : String},
  attachments : [{
    fileid : String,
    filename : String
    }]
});

AppointmentSchema
.virtual('url')
.get(function () {
  return '/doctor/appointment/'+this._id
});

AppointmentSchema
.virtual('time_format')
.get(function () {
  return moment(this.time).format('MMMM Do YYYY, h:mm:ss a');
});

AppointmentSchema
.virtual('time_update_format')
.get(function () {
  return moment(this.time).format('YYYY-MM-DD') + "T" + moment(this.time).format('HH:mm:ss');
});

// Export model.
module.exports = mongoose.model('Appointment', AppointmentSchema);
