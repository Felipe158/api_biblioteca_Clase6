const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
app.use(express.json());

// Importamos el Router de Libros
const librosRouter = require('./routes/libros');

// Importamos el Middelware Error Handler
const errorHandler = require('./middleware/errorHandler');

const autentication = auth({
    audience: 'https://exampleApiLibros.com/libros',
    issuerBaseURL: "https://dev-53d0emcfb28ijpat.us.auth0.com/",
    tokenSigingAlg: "RS256",
});

// // Validar todas las rutas
// app.use(autentication);


app.use('/libros', autentication, librosRouter);

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
