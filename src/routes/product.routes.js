const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "obtener todos los libros"});
});

router.get("/:id", (req, res) => {
    res.json({ message:`Obtener libro ${req.params.id}` });
});

router.put("/:id", (req, res) => {
    res.json({message: `Actualizar libro ${req.params.id}`});
 });
 
router.delete("/:id", (req, res) => {
    res.json({message: `Eliminar libro ${req.params.id}`});
 });

 module.exports = routers;
 
