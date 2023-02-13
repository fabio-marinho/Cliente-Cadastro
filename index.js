const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Cliente = require('./models/clientes');

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/cadastro-cliente')


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.send('online')
});

app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.find({})
    res.render('clientes/index', { clientes })
});


app.get('/clientes/novo', (req, res) => {
    res.render('clientes/novo')
});


app.post('/clientes', async (req, res) => {
    const cliente = new Cliente(req.body.cliente);
    await cliente.save();
    res.redirect(`/clientes/${cliente._id}`)
})


app.get('/clientes/:id', async (req, res) => {
    const cliente = await Cliente.findById(req.params.id)
    res.render('clientes/mostrar', { cliente });
});

app.get('/clientes/:id/editar', async (req, res) => {
    const cliente = await Cliente.findById(req.params.id)
    res.render('clientes/editar', { cliente });
})

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, { ...req.body.cliente });
    res.redirect(`/clientes/${cliente._id}`)
})



app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.redirect('/clientes');
})


app.listen(8080, () => {
    console.log("Serving on port 8080");
});