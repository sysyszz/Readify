const express = require('express');
const dotenv = require('dotenv');
const conectarDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API CRUD con Node.js, Express y MongoDB funcionando correctamente');
});

app.use('/api/libros', require('./routes/libros.routes'));

app.use((req, res) => {
    res.status(404).json({
        ok: false,
        mensaje: 'Ruta no encontrada'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en  http://localhost:${PORT}`);
});