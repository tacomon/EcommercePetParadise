const express = require('express');
const router = express.Router();
const productController = require('../controllers/productoController')
const Producto = require("../models/Producto");


// Ruta para obtener productos
router.get('/', productController.obtenerProductos);
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: 'El producto no existe' });
    }

    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
});

router.post('/:id', productController.agregarAlCarrito);

module.exports = router;
