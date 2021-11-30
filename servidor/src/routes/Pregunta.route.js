const {Router} = require('express')
const router = Router()
const PreguntaCtrl = require('../controllers/Pregunta.controllers')
const Auth = require('../helper/Auth')

router.post('/crear', Auth.verificarToken, PreguntaCtrl.crear)
router.get('/listar', Auth.verificarToken, PreguntaCtrl.listar)
router.get('/listar/:id', Auth.verificarToken, PreguntaCtrl.listarId)
router.get('/listarPorDocente/:id', Auth.verificarToken, PreguntaCtrl.listarPorDocente)
router.get('/listarPorEvaluacion/:id', Auth.verificarToken, PreguntaCtrl.listarPorEvaluacion)
router.delete('/eliminar/:id', Auth.verificarToken, PreguntaCtrl.eliminar)
router.put('/actualizar/:id', Auth.verificarToken, PreguntaCtrl.actualizar)
router.get('/buscar/:enunciado/:id', Auth.verificarToken, PreguntaCtrl.buscarPregunta)
router.get('/listarE', PreguntaCtrl.listar)

module.exports = router