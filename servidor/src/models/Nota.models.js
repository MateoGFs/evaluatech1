const mongoose = require('mongoose')
const {Schema} = mongoose

const NotaSchema = new Schema({
    nota: {type: Number, required: [true, 'Campo apellido obligatorio'], trim: true},
    estudianteId: {type: String, trim: true},
    evaluacionId: {type: String, trim: true},
    docenteId: {type: String}
})

module.exports=mongoose.model('nota', NotaSchema)