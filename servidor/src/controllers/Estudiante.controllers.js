const EstudianteCtrl = {}
const Estudiante = require('../models/Estudiante.models')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

EstudianteCtrl.crear = async(req,res)=>{
    const{identificacion, nombre, apellido, clave, tipo, grupoId, docenteId}=req.body
    const NuevoEstudiante = new Estudiante({
        identificacion, 
        nombre, 
        apellido, 
        clave,
        tipo, 
        grupoId, 
        docenteId
    })

    const identificacionEstudiante = await Estudiante.findOne({identificacion: identificacion})
    if (identificacionEstudiante) {
        res.json({
            mensaje: 'La identificación ya existe Estudiante'
        })

    } else {
        NuevoEstudiante.clave = await bcrypt.hash(clave, 10)
        // const token = jwt.sign({_id: NuevoEstudiante._id }, 'Secreta')
        await NuevoEstudiante.save()
        res.json({
            mensaje: 'Estudiante Registrado',
            id: NuevoEstudiante._id,
            nombre: NuevoEstudiante.nombre,
            tipo: NuevoEstudiante.tipo
            // token
        })
    }
}

// EstudianteCtrl.login = async(req,res)=>{
//     const {identificacion, clave} = req.body
//     const estudiante = await Estudiante.findOne({identificacion: identificacion})

//     if (!estudiante) {
//         return res.json({
//             mensaje: 'Identificación incorrecta Estudiante'
//         })
//     }

//     const match = await bcrypt.compare(clave, estudiante.clave) 

//     if (match) {
//         // const token = jwt.sign({_id: estudiante._id}, 'Secreta')

//         res.json({
//             mensaje: 'Bienvenido Estudiante Login',
//             id: estudiante.id,
//             nombre: estudiante.nombre,
//             // token
//         })
//     } else {
//         res.json({
//             mensaje: 'Contraseña incorrecta Estudiante'
//         })
//     }
// }

EstudianteCtrl.listar = async(req,res)=>{
    const respuesta = await Estudiante.find()
    res.json(respuesta)
}

EstudianteCtrl.listarId = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Estudiante.findById({_id: id})
    res.json(respuesta)
}
//Por docente
EstudianteCtrl.estudianteDeunDocente = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Estudiante.find({docenteId: id})
    res.json(respuesta)
}
//Por grupo
EstudianteCtrl.estudianteDeunGrupo = async(req,res)=>{
    const id = req.params.id
    const respuesta = await Estudiante.find({grupoId: id})
    res.json(respuesta)
}

EstudianteCtrl.eliminar = async(req,res)=>{
    const id = req.params.id
    await Estudiante.findByIdAndRemove({_id: id})
    res.json({
        mensaje: 'Estudiante eliminado'
    })
}

EstudianteCtrl.actualizar = async (req,res)=>{
    const id = req.params.id
    await Estudiante.findByIdAndUpdate({_id: id}, req.body) 
    res.json({
        mensaje: 'Estudiante Actualizado'
    })
}

EstudianteCtrl.buscarEstudiante = async(req,res)=>{
    const {nombre, id} = req.params
    const respuesta = await Estudiante.find({nombre:{ $regex:".*" +nombre+ ".*"}, docenteId:id})
    res.json(respuesta)
}

module.exports=EstudianteCtrl