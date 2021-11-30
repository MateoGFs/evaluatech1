const {Router} = require('express');
const router = Router()
const NotaCtrl = require('../controllers/Nota.controllers')
const Auth = require('../helper/Auth')

router.post('/crear', NotaCtrl.crear)
router.get('/listar', NotaCtrl.listar)
router.get('/listar/:id', NotaCtrl.listarId)
router.get('/listarPorDocente/:id', Auth.verificarToken, NotaCtrl.listarPorDocente)
router.get('/listarPorEvaluacion/:id', NotaCtrl.listarPorEvaluacion)
router.get('/listarPorEstudiante', NotaCtrl.listarPorEstudiante)
router.delete('/eliminar/:id', NotaCtrl.eliminar)
router.put('/actualizar/:id', NotaCtrl.actualizar)

module.exports = router