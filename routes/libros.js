const express = require('express');
const router =express.Router();

const Libro = require('../models/Libro');

// Importamos la libreria para validar scopes
const { requiredScopes } = require('express-oauth2-jwt-bearer');


// Ruta para obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);

        // console.log(libros[2]);
        // console.log(typeof(libros));
        // console.log(typeof(libros[0]));
        
        // for (let i=0; i<=libros.length(); i++){
        //     console.log("Un ejemplar de " + libros[i]["titulo"]);
        // }

    } catch (error) {
        res.status(500).json({ error: "Error al obtener los libros "})
    }
});

// Ruta para obtener un libro por ID
router.get('/:id', requiredScopes('read:libros'), async (req, res) => {
    try{
        const libro = await Libro.find({
            id: req.params.id });
        console.log(libro);
        
        if (libro == '') {
            console.log('libro no encontrado');
            const error = new Error('Libro no encontrado');
            error.status = 404;
            throw(error);
        }
        res.json(libro);

    } catch (err) {
        res.status(500).json({ error: "Error al obtener el libro"})
    }
});

// Ruta para crear un nuevo libro
router.post('/', requiredScopes('write:libros'), async (req, res) => {
    try{
    const nuevoLibro = new Libro(req.body);
    await nuevoLibro.save();
    res.json(nuevoLibro);
} catch (error) {
    res.status(500).json({ error: "Error al crear el libro" });

}
});

// Ruta para actualizar un libro existente
router.put('/:id', requiredScopes('write:libros'), async (req, res) => {
    try {
        const Libro = await Libro.fidByIdAndUpdate(req.params.id, req.body,
            { 
                new: true,
        });
        res.json(Libro);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el libro" });
    }
});



// Ruta para eliminar un libro
router.delete('/:id', requiredScopes('write:libros'), async (req, res) => {
    try {
        
        await Libro.find({ titulo: req.params.titulo });
        
        //await Libro.findByIdAndDelete(req.params.titulo);
        res.json({ message: "Libro eliminado correctamente" });
    } catch (error) {
        console.log(req.params.titulo);
        res.status(500).json({ error: "Error al eliminar el libro" });
    }
});






module.exports = router;