const mongoose = require('mongoose');
const {Schema} = mongoose

const DocenteSchema = new Schema({
    
    identificacion: { type: String, required: [true, 'Campo identificacion obligatorio'], trim: true},
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    apellido: { type: String, required: [true, 'Campo apellido obligatorio'], trim: true },
    celular: { type: String, required: false, trim: true },
    clave: { type: String, required: [true, 'Campo clave obligatorio'], trim: true },
    tipo: { type: String, required: [true, 'Campo tipo obligatorio'], trim: true, default: 'D' }

})

module.exports=mongoose.model('docente', DocenteSchema)