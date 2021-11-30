const mongoose = require('mongoose')
const {Schema} = mongoose

const AlternativaSchema = new Schema({
    respuesta: { type: String, required: [true, 'Campo respuesta obligatorio'], trim: true },
    valor: { type: Boolean, required: [true, 'Campo valor obligatorio'], trim: true, default: false },
    preguntaId: {type: String, trim: true},
    docenteId: {type: String}
})

module.exports=mongoose.model('alternativa', AlternativaSchema)