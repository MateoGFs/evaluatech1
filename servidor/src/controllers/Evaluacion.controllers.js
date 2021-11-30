const EvaluacionCtrl = {}
const Evaluacion = require('../models/Evaluacion.models')

EvaluacionCtrl.crear = async(req,res)=>{
    const {nombre, descripcion, fecha, areaId, grupoId, realizada, docenteId} = req.body
    const NuevaEvaluacion = new Evaluacion({
        nombre, 
        descripcion, 
        fecha,
        areaId, 
        grupoId, 
        realizada, 
        docenteId
    })
    const respuesta = await NuevaEvaluacion.save()
    res.json({
        mensaje: 'Evaluacion creada',
        respuesta
    })
}

EvaluacionCtrl.listar = async(req,res)=>{
    const respuesta = await Evaluacion.find()
    res.json(respuesta)
}

EvaluacionCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Evaluacion.findById({_id:id})
    res.json(respuesta)
}

EvaluacionCtrl.listarPorDocente = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Evaluacion.find({docenteId:id})
    res.json(respuesta)
}

EvaluacionCtrl.listarPorAreaGrupo = async(req,res)=>{
    const areaId = req.params.idArea
    const grupoId = req.params.idGrupo
    const respuesta = await Evaluacion.find({areaId:areaId, grupoId:grupoId})
    res.json(respuesta)
}

EvaluacionCtrl.eliminar = async(req,res)=>{
    const id = req.params.id
    await Evaluacion.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Evaluacion eliminada correctamente'
    })
}

EvaluacionCtrl.actualizar = async(req,res)=>{
    const id = req.params.id
    await Evaluacion.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: 'Evaluacion Actualizada'
    })
}

EvaluacionCtrl.buscarEvaluacion = async(req,res)=>{
    const {nombre, id} = req.params
    const respuesta = await Evaluacion.find({nombre:{ $regex:".*" +nombre+ ".*"}, docenteId:id})
    res.json(respuesta)
}

module.exports=EvaluacionCtrl