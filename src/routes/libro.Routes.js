const express = require("express");
const { register } = require("../controllers/auth.controller");

const router = express.Router();

router.use("/register", register)



module.exports = router;