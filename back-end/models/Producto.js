const mongoose =require('mongoose');

const ProductoSchema = mongoose.Schema({

        producto:{
            type: String,
            required: true
        },
        detalles:{
            type: String,
            required: true
        },
        talla:[{
            type: Number,
            required: true
        }],
        precio:{
            type: Number,
            required: true
        },
        categoria:{
            type: String,
            require: true
        },
        imagen:{
            type: String,
            require: true
        }

        

});


module.exports= mongoose.model('Producto', ProductoSchema);
