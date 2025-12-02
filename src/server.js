
const express = require("express");
require("dotenv").config();
const morgan = require("morgan");


const libroAuth = require("./routes/libro.routes");
const cartRoutes = require("./routes/cart.routes");
const favsRoutes = require("./routes/favorites.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");


const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/libro", libroRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/favorites", favsRoutes);
app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API de Gestión de Libros",
        version: "1.0.0",
        endpoints: {
            libros: "/libro",
            productos: "/api/v1/product",
            carrito: "/api/v1/cart",
            favoritos: "/api/v1/favorites",
            usuarios: "/api/v1/user"
        }
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada"
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Error interno del servidor"
    });
});


//puertos
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost: ${port}`);
});