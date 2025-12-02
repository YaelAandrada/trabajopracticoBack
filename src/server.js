
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

//rutas


const app = express();

//milleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//puertos
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:' + port);
})