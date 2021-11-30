const PreguntaCtrl = {}
const Pregunta = require('../models/Pregunta.models')

PreguntaCtrl.crear = async(req,res)=>{
    const {enunciado, evaluacionId, docenteId}=req.body
    const NuevaPregunta = new Pregunta({
        enunciado,
        evaluacionId,
        docenteId
    })

    const respuesta = await NuevaPregunta.save()

    res.json({
        mensaje: 'Pregunta creada',
        respuesta
    })
}

PreguntaCtrl.listar = async(req,res)=>{
    const respuesta = await Pregunta.find()
    res.json(respuesta)
}

PreguntaCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Pregunta.findById({_id:id})
    res.json(respuesta)
}

PreguntaCtrl.listarPorDocente = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Pregunta.find({docenteId:id})
    res.json(respuesta)
}

PreguntaCtrl.listarPorEvaluacion = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Pregunta.find({evaluacionId:id})
    res.json(respuesta)
}

PreguntaCtrl.eliminar = async(req,res)=>{
    const id = req.params.id
    await Pregunta.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Pregunta eliminada correctamente'
    })
}

PreguntaCtrl.actualizar = async(req,res)=>{
    const id = req.params.id
    await Pregunta.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: 'Pregunta Actualizada'
    })
}

PreguntaCtrl.buscarPregunta = async(req,res)=>{
    const {enunciado, id} = req.params
    const respuesta = await Pregunta.find({enunciado:{ $regex:".*" +enunciado+ ".*"}, docenteId:id})
    res.json(respuesta)
}

module.exports = PreguntaCtrl