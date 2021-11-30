const DocenteCtrl = {}
const Docente = require('../models/Docente.models')
const Estudiante = require('../models/Estudiante.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

DocenteCtrl.crearDocente = async(req,res)=>{
    const {identificacion, nombre, apellido, celular, clave, tipo} = req.body
    const NuevoDocente = new Docente({
        identificacion, 
        nombre, 
        apellido, 
        celular, 
        clave,
        tipo
    })
    const identificacionDocente = await Docente.findOne({identificacion: identificacion})
    if (identificacionDocente) {
        res.json({
            mensaje: 'La identificación ya existe Docente'
        })

    } else {
        NuevoDocente.clave = await bcrypt.hash(clave, 10)
        const token = jwt.sign({_id: NuevoDocente._id }, 'Secreta')
        await NuevoDocente.save()
        res.json({
            mensaje: 'Registro exitoso',
            id: NuevoDocente._id,
            nombre: NuevoDocente.nombre,
            tipo: NuevoDocente.tipo,
            token
        })
    }
}

// DocenteCtrl.login = async(req,res)=>{
//     const {identificacion, clave} = req.body
//     const docente = await Docente.findOne({identificacion: identificacion})

//     if (!docente) {

//         return res.json({
//             mensaje: 'Identificación incorrecta Docente'
//         })
//     }

//     const match = await bcrypt.compare(clave, docente.clave) 

//     if (match) {
//         const token = jwt.sign({_id: docente._id}, 'Secreta')

//         res.json({
//             mensaje: 'Bienvenido Docente',
//             id: docente.id,
//             nombre: docente.nombre,
//             token
//         })
//     } else {
//         res.json({
//             mensaje: 'Contraseña incorrecta Docente'
//         })
//     }
// }

DocenteCtrl.loginprueba = async(req,res)=>{
    const {identificacion, clave} = req.body
    const docente = await Docente.findOne({identificacion: identificacion})
    const estudiante = await Estudiante.findOne({identificacion: identificacion})
    
    if (!docente) {
        if(!estudiante){
            return res.json({
                mensaje: 'Identificación incorrecta estudiante'
            })
        } 
        const matche = await bcrypt.compare(clave, estudiante.clave) 
        if(matche) {
            res.json({
                mensaje: 'Bienvenido',
                id: estudiante.id,
                nombre: estudiante.nombre,
                tipo: estudiante.tipo
                
                //token
            })
        } else {
            res.json({
                mensaje: 'Contraseña incorrecta Estudiante'
            })

        }        
        // return res.json({
        //     mensaje: 'Identificación incorrecta Docente'
        // })
    } else {
        const matchd = await bcrypt.compare(clave, docente.clave)
        if (matchd) {
            const token = jwt.sign({_id: docente._id}, 'Secreta')

            res.json({
                mensaje: 'Bienvenido',
                id: docente.id,
                nombre: docente.nombre,
                tipo: docente.tipo,
                token
        })
        } else {
            res.json({
            mensaje: 'Contraseña incorrecta Docente'
            })
        }
    }  
}

module.exports = DocenteCtrl