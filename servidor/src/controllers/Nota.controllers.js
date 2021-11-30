const NotaCtrl = {}
const Nota = require('../models/Nota.models')

NotaCtrl.crear = async(req,res)=>{
    const {nota, estudianteId, evaluacionId, docenteId}=req.body
    const NuevaNota = new Nota({
        nota,
        estudianteId,
        evaluacionId,
        docenteId
    })
    
    const respuesta = await NuevaNota.save()

    res.json({
        mensaje: 'Nota agregada',
        respuesta
    })
}

NotaCtrl.listar = async(req,res)=>{
    const respuesta = await Nota.find()
    res.json(respuesta)
}

NotaCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Nota.findById({_id: id})
    res.json(respuesta) 
}

NotaCtrl.listarPorDocente = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Nota.find({docenteId:id})
    res.json(respuesta)
}

NotaCtrl.listarPorEvaluacion = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Nota.find({evaluacionId:id})
    res.json(respuesta)
}

NotaCtrl.listarPorEstudiante = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Nota.find({estudianteId:id})
    res.json(respuesta)
}

NotaCtrl.eliminar = async(req,res)=>{
    const id = req.params.id
    await Nota.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Nota eliminada'
    })
}
NotaCtrl.actualizar = async(req,res)=>{
    const id = req.params.id
    await Nota.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: 'Nota actualizada'
    })
}

module.exports = NotaCtrl