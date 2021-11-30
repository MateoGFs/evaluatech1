const {Router} = require('express')
const router = Router()
const AlternativaCtrl = require('../controllers/Alternativa.controllers')
const Auth = require('../helper/Auth')

router.post('/crear', Auth.verificarToken, AlternativaCtrl.crear)
router.get('/listar', Auth.verificarToken, AlternativaCtrl.listar)
router.get('/listar/:id', Auth.verificarToken, AlternativaCtrl.listarId)
router.get('/listarPorDocente/:id', Auth.verificarToken, AlternativaCtrl.listarPorDocente)
router.get('/listarPorPregunta/:id', Auth.verificarToken, AlternativaCtrl.listarPorPregunta)
router.delete('/eliminar/:id', Auth.verificarToken, AlternativaCtrl.eliminar)
router.put('/actualizar/:id', Auth.verificarToken, AlternativaCtrl.actualizar)
router.get('/buscar/:respuesta/:id', Auth.verificarToken, AlternativaCtrl.buscarAlternativa)
router.get('/listarE', AlternativaCtrl.listar)

module.exports = router