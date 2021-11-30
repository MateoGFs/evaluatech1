const {Router} = require('express');
const router = Router()
const EvaluacionCtrl = require('../controllers/Evaluacion.controllers')
const Auth = require('../helper/Auth')

router.post('/crear', Auth.verificarToken, EvaluacionCtrl.crear)
router.get('/listar', Auth.verificarToken, EvaluacionCtrl.listar)
router.get('/listar/:id', Auth.verificarToken, EvaluacionCtrl.listarId)
router.get('/listarPorDocente/:id', Auth.verificarToken, EvaluacionCtrl.listarPorDocente)
router.get('/listarPorAreaGrupo/:idArea/:idGrupo', Auth.verificarToken, EvaluacionCtrl.listarPorAreaGrupo)
router.delete('/eliminar/:id', Auth.verificarToken, EvaluacionCtrl.eliminar)
router.put('/actualizar/:id', Auth.verificarToken, EvaluacionCtrl.actualizar)
router.get('/buscar/:nombre/:id', Auth.verificarToken, EvaluacionCtrl.buscarEvaluacion)
router.get('/listarE', EvaluacionCtrl.listar)


module.exports=router
