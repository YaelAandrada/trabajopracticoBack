const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.json({ message: "obtener favoritos"});
});

router.post("/", (req, res) => {
    res.json({ mesage: "Agregar a favoritos"});
});

router.delete("/:id", (req, res) => {
    res.json({ message: "Eliminar de favoritos"});
});

module.exports = routers;