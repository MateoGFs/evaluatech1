const GrupoCtrl = {}
const Grupo = require('../models/Grupo.models')

GrupoCtrl.crear = async(req,res)=>{
    const{nombre, docenteId}=req.body
    const NuevoGrupo = new Grupo({
        nombre,
        docenteId
    })

    const respuesta = await NuevoGrupo.save()

    res.json({
        mensaje: 'Grupo creado',
        respuesta
    })
}

GrupoCtrl.listar = async(req,res)=>{
    const respuesta = await Grupo.find()
    res.json(respuesta)
}

GrupoCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Grupo.findById({_id:id})
    res.json(respuesta)
}

GrupoCtrl.listarPorDocente = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Grupo.find({docenteId:id})
    res.json(respuesta)
}

GrupoCtrl.eliminar = async(req,res)=>{
    const id = req.params.id
    await Grupo.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Grupo eliminado correctamente'
    })
}

GrupoCtrl.actualizar = async(req,res)=>{
    const id = req.params.id
    await Grupo.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: 'Grupo Actualizado'
    })
}

GrupoCtrl.buscarGrupo = async(req,res)=>{
    const {nombre, id} = req.params
    const respuesta = await Grupo.find({nombre:{ $regex:".*" +nombre+ ".*"}, docenteId:id})
    res.json(respuesta)
} 

module.exports=GrupoCtrl