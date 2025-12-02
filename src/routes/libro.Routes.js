const express = require("express");
const { 
    registerBook, 
    getBooks, 
    deleteBook, 
    updateBook 
} = require("../controllers/auth.controller");

const router = express.Router();

os
router.post("/register", registerBook);      
router.get("/", getBooks);                   
router.get("/:id", getBooks);                
router.delete("/:id", deleteBook);           
router.put("/:id", updateBook);             
router.patch("/:id", updateBook);           

module.exports = router;