// server.js
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const usersRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares globales
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.use('/api/users', usersRoutes);

// Endpoints de prueba
app.get('/', (req, res) => {
    res.send('Ruta raíz del Backend');
});

app.get('/test', (req, res) => {
    res.send('Ruta TEST');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

// Exportamos la app para que la use index.js
module.exports = app;