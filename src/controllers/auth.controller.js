

const register = (req, res) => {
    const { name, description } = req.body;
    res.status(201).json({
        ok: true,
        name,
        msj: "libro creado"
    })
};

module.exports = {
    register
}