const mongoose = require('mongoose')
const {Schema} = mongoose

const EstudianteSchema = new Schema({
    identificacion: {type: String, required: [true, 'Campo identificacion obligatorio'], trim:true, unique:true},
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    apellido: {type: String, required: [true, 'Campo apellido obligatorio'], trim: true},
    clave: { type: String, required: [true, 'Campo clave obligatorio'], trim: true },
    tipo: { type: String, required: [true, 'Campo tipo obligatorio'], trim: true, default: 'E' },
    
    grupoId: {type: String, trim: true},
    docenteId: {type: String, trim: true}
})
module.exports=mongoose.model('estudiante', EstudianteSchema)