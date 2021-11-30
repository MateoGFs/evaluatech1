const mongoose = require('mongoose')
const {Schema} = mongoose

const EvaluacionSchema = new Schema({
    nombre: {type: String, required: [true, 'Campo nombre obligatorio'], trim: true},
    descripcion: {type: String, required: false, trim: true},
    fecha: { type: Date, required: [true, 'Campo fecha obligatorio'], default: Date.now },
    areaId: {type: String, trim: true},
    grupoId: {type: String, trim: true},
    //realizada: {type: Boolean, trim: true, default: false},
    docenteId: {type: String}
})

module.exports=mongoose.model('evaluacion', EvaluacionSchema)