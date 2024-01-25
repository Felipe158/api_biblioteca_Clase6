const mongoose = require('mongoose');

mongoose.connect("mongodb://root:example@localhost:27017/Biblioteca?authSource=admin&authMechanism=SCRAM-SHA-256", {
    useUnifiedTopology: true,
    useNewUrlParser: true,

});

const LibroSchema = new mongoose.Schema({
    id: Number,
    titulo: String,
    autor: String
}, { collection: 'Libros' });

const Libro = mongoose.model('Libro', LibroSchema);

module.exports = Libro;