const mongoose = require('mongoose');
const dados = require('./dados');
const { nome, cidade } = require('./ajudadorDados');
const Cliente = require('../models/clientes')

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/cadastro-cliente')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})


const sample = (array) => array[Math.floor(Math.random() * array.length)];



const dadosDB = async () => {
    await Cliente.deleteMany({});
    for (let i = 0; i < 5; i++) {
        const random5 = Math.floor(Math.random() * 5);
        const clientes = new Cliente({
            Nome: `${sample(nome)} , ${sample(cidade)}`,
            Endereço: `${dados[random5].Cpf}, ${dados[random5].Nascimento}, ${dados[random5].Endereço}, ${dados[random5].Estado}`
        })
        await clientes.save();
    }

}

dadosDB().then(() => {
    mongoose.connection.close();
});