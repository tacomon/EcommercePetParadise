const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  detalles: { type: String, required: true },
  tallas: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  imagen: { type: String, required: true }
});

// talla:[{
//     type: Number,
//     required: true
// }],

module.exports = mongoose.model('Producto', ProductoSchema);