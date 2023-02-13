const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
     Nome: String,
     Sexo: String,
     Email: String,
     Nascimento: String,
     CPF: Number,
     Endereço: String,
     Estado: String,
     Cidade: String,

});

module.exports = mongoose.model('Cliente', ClienteSchema)