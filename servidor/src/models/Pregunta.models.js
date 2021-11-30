const mongoose = require('mongoose')
const {Schema} = mongoose

const PreguntaSchema = new Schema({
    enunciado: {type: String, required: [true, 'Campo enuciado obligatorio'], trim: true},
    evaluacionId: {type: String, trim: true},
    docenteId: {type: String}
})

module.exports=mongoose.model('pregunta', PreguntaSchema)