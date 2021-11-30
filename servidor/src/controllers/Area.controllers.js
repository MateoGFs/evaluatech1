const AreaCtrl = {}
const Area = require('../models/Area.models')

AreaCtrl.crear = async(req,res)=>{
    const {nombre, docenteId}=req.body
    const NuevaArea = new Area({
        nombre,
        docenteId
    })

    const respuesta = await NuevaArea.save()
    
    res.json({
        mensaje: 'Area creada',
        respuesta
    })
}

AreaCtrl.listar = async(req,res)=>{
    const respuesta = await Area.find()
    res.json(respuesta)
}

AreaCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Area.findById({_id:id})
    res.json(respuesta)
}

AreaCtrl.listarPorDocente = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Area.find({docenteId:id})
    res.json(respuesta)
}

AreaCtrl.eliminar = async(req,res)=>{
    const id = req.params.id
    await Area.findByIdAndRemove({_id:id})
    res.json({
        mensaje: 'Area eliminada correctamente'
    })
}

AreaCtrl.actualizar = async(req,res)=>{
    const id = req.params.id
    await Area.findByIdAndUpdate({_id:id},req.body)
    res.json({
        mensaje: 'Area Actualizada'
    })
}

AreaCtrl.buscarArea = async(req,res)=>{
    const {nombre, id} = req.params
    const respuesta = await Area.find({nombre:{ $regex:".*" +nombre+ ".*"}, docenteId:id})
    res.json(respuesta)
}

module.exports=AreaCtrl