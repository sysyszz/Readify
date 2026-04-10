const mongoose = require('mongoose');

const librosSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, 'El titulo es obligatorio'],
            trim: true
        },
        autor:  {
            type: String,
            required: [true, 'El nombre del autor es obligatorio'],
            trim: true
        },
        genero: {
            type: String,
            required: [true, 'El genero es obligatorio'],
            trim: true
        },
        anio: {
            type: Number,
            required: [true, 'El año de publicación es obligatorio'],
            min: [0, 'El año de publicación no puede ser negativo'],
            max: [new Date().getFullYear(), 'El año no puede ser mayor al año actual']
        },
        disponible: {
            type: Boolean,
            default: true
        }
    },
        {
            timestamps: true
        }
);

module.exports = mongoose.model('Libro', librosSchema);