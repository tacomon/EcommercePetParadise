const Producto = require("../models/Producto");


exports.obtenerProductos = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Página actual, por defecto la primera página
    const limit = parseInt(req.query.limit) || 40; // Cantidad de productos por página

    try {
        const skip = (page - 1) * limit;

        const totalProducts = await Producto.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        const productos = await Producto.find()
            .skip(skip)
            .limit(limit);

        res.json({
            products: productos,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerDetails = async (req, res) => {
  try {
    console.log('Recibida solicitud para obtener detalles del producto con ID:', req.params.id);

    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      console.log('Producto no encontrado');
      return res.status(404).json({ msg: 'El producto no existe' });
    }

    res.json(producto); // Devuelve el producto como respuesta
  } catch (error) {
    console.log('Error al obtener detalles del producto:', error);
    res.status(500).send('Hubo un error');
  }
};
exports.agregarAlCarrito = async (req, res) => {
  try {
    const productId = req.params.id; // Obtén el ID del producto a agregar al carrito

    const producto = await Producto.findById(productId);

    if (!producto) {
      return res.status(404).json({ msg: 'El producto no existe' });
    }

    const userId = req.user.id;

    res.status(200).json({ msg: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).send('Hubo un error al agregar el producto al carrito');
  }
};

// Controlador para registrar un nuevo producto
exports.registrarProducto = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ mensaje: 'No se proporcionaron datos en el cuerpo de la solicitud' });
    }
    const { nombre, precio, detalles, talla, categoria } = req.body;
    const nuevoProducto = new Producto({ nombre, precio, detalles, talla, categoria  });  
    await nuevoProducto.save();
  
    res.status(201).json({ mensaje: 'Producto registrado exitosamente', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  }
};


// Controlador para eliminar un producto por su ID
exports.eliminarProducto = async (req, res) => {
  try {
    // Busca el producto por su ID y elimínalo
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'El producto no existe' });
    }

    res.json({ mensaje: 'Producto eliminado exitosamente', producto: productoEliminado });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
  }
};