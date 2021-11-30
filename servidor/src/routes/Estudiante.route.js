const {Router} = require('express')
const router = Router()
const EstudianteCtrl = require('../controllers/Estudiante.controllers')
const Auth = require('../helper/Auth')

router.post('/crear', Auth.verificarToken, EstudianteCtrl.crear)
// router.post('/login', EstudianteCtrl.login)
router.get('/listar', Auth.verificarToken, EstudianteCtrl.listar)
router.get('/listar/:id', Auth.verificarToken, EstudianteCtrl.listarId)
router.get('/listarPorDocente/:id', Auth.verificarToken, EstudianteCtrl.estudianteDeunDocente)
router.get('/listarPorGrupo/:id', Auth.verificarToken, EstudianteCtrl.estudianteDeunGrupo)
router.delete('/eliminar/:id', Auth.verificarToken, EstudianteCtrl.eliminar)
router.put('/actualizar/:id', Auth.verificarToken, EstudianteCtrl.actualizar)
router.get('/buscar/:nombre/:id', Auth.verificarToken, EstudianteCtrl.buscarEstudiante)
router.get('/listarE', EstudianteCtrl.listar)

module.exports = router

