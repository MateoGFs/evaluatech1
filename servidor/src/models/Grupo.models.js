const mongoose = require('mongoose')
const {Schema} = mongoose

const GrupoSchema = new Schema({
    nombre: { type: String, required: [true, 'Campo nombre obligatorio'], trim: true },
    docenteId: {type: String}
})

module.exports=mongoose.model('grupo', GrupoSchema)