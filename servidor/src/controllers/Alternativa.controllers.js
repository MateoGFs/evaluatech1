const AlternativaCtrl = {}
const Alternativa = require('../models/Alternativa.models')

AlternativaCtrl.crear = async(req,res)=>{
    const{respuesta, valor, preguntaId, docenteId}=req.body
    const NuevaAlternativa = new Alternativa({
        respuesta,
        valor,
        preguntaId,
        docenteId
    })

    const respuestaAlternativa = await NuevaAlternativa.save()

    res.json({
        mensaje: 'Alternativa creada',
        respuestaAlternativa
    })
}

AlternativaCtrl.listar = async(req,res)=>{
    const respuestaAlternativa = await Alternativa.find()
    res.json(respuestaAlternativa)
}

AlternativaCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuestaAlternativa = await Alternativa.findById({_id:id})
    res.json(respuestaAlternativa)
}

AlternativaCtrl.listarPorDocente = async(req,res)=>{
    const id = req.params.id
    const respuestaAlternativa = await Alternativa.find({docenteId:id})
    res.json(respuestaAlternativa)
}

AlternativaCtrl.listarPorPregunta = async(req,res)=>{
    const id = req.params.id
    const respuestaAlternativa = await Alternativa.find({preguntaId:id})
    res.json(respuestaAlternativa)
}

AlternativaCtrl.eliminar = async(req,res)=>{
    const id = req.params.id
    await Alternativa.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Alternativa eliminada correctamente'
    })
}

AlternativaCtrl.actualizar = async(req,res)=>{
    const id = req.params.id
    await Alternativa.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: 'Alternativa actualizada'
    })
}

AlternativaCtrl.buscarAlternativa = async(req,res)=>{
    const {respuesta, id} = req.params
    const respuestaAlternativa = await Alternativa.find({respuesta:{ $regex:".*" +respuesta+ ".*"}, docenteId:id})
    res.json(respuestaAlternativa)
}

module.exports = AlternativaCtrl