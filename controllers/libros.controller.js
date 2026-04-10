const Libro = require('../models/libro');

const crearLibro = async (req, res) => {
    try {
        const libro = new Libro(req.body);
        const libroGuardado = await libro.save();

        res.status(201).json({
            ok: true,
            mensaje: 'Libro creado exitosamente',
            libro: libroGuardado
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: 'Error al crear el Libro',
            error: error.message
        });
    }
};

const obtenerLibros = async (req, res) => {
    try{
        const libros = await Libro.find();

        res.status(200).json({
            ok: true,
            total: libros.length,
            data: libros
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error al obtener los Libros',
            error: error.message
        });
    }
};

const obtenerLibroPorId = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);

        if (!libro) {
            return res.status(404).json ({
                ok: false,
                mensaje: 'Libro no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data: libro
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: 'Error al buscar libro',
            error: error.message
        });
    }
};

const actualizarLibro = async (req, res) => {
    try {
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if(!libroActualizado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Libro no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Libro actualizado correctamente',
            data: libroActualizado
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar el libro',
            error: error.message
        });
    }
};

const eliminarLibro = async (req, res) => {
    try {
        const libroEliminado = await Libro.findByIdAndDelete(req.params.id);

        if (!libroEliminado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Libro no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Libro eliminado correctamente',
            data: libroEliminado
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            mensaje: 'Error al eliminar el Libro',
            error: error.message
        });
    }
};

module.exports = {
    crearLibro,
    obtenerLibros,
    obtenerLibroPorId,
    actualizarLibro,
    eliminarLibro
};