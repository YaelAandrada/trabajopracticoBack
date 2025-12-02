const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "obtener Carrito"});
});

router.post("/", (req, res) => {
    res.json({ mesage: "Agregar al carrito"});
});

router.delete("/:id", (req, res) => {
    res.json({ message: "Eliminar del carrito"});
});

module.exports = routers;