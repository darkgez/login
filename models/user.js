var mongoose = require('mongoose');

var PasienSchema = new mongoose.Schema({
    nama : {type: String, unique:true, lowercase:true },
    nrm : Number
});

module.exports = mongoose.model('Pasien', PasienSchema);