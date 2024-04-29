const express = require('express');
const router = express.Router();
const productController = require('../controllers/productoController')
const Producto = require("../models/Producto");


// Ruta para obtener productos
router.get('/', productController.obtenerProductos);

// Ruta para obtener detalles de los productos
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
// Ruta para agregar un producto al carrito
router.post('/:id', productController.agregarAlCarrito);

// Ruta para registrar un nuevo producto
router.post('/', productController.registrarProducto);

// Ruta para eliminar un producto por su ID
router.delete('/:id', productController.eliminarProducto);

//Ruta para actualizar un producto por su ID
router.put('/:id', productController.actualizarProducto);


module.exports = router;
