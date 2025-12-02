
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

//importar rutas
const libroAuth = require("./routes/libro.routes");
const cartRoutes = require("./routes/cart.routes");
const favsRoutes = require("./routes/favorites.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");


const app = express();

//milleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
app.use("/libro", libroAuth);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/favorites", favsRoutes);
app.use("/api/v1/user", userRoutes);

//puertos
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:' + port);
})