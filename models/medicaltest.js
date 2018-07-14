var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MedicaltestSchema = new Schema({
  pid: {type : String , required: true , max: 40 },
  time: { type: Date , required: true},
  notes: {type : String},
  attachments : [{
    fileid : String,
    filename : String
  }]
});


// Export model.
module.exports = mongoose.model('Medicaltest', MedicaltestSchema);
