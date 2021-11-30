const {Router} = require('express');
const router = Router()
const GrupoCtrl = require('../controllers/Grupo.controllers')
const Auth = require('../helper/Auth')

router.post('/crear', Auth.verificarToken, GrupoCtrl.crear)
router.get('/listar', Auth.verificarToken, GrupoCtrl.listar)
router.get('/listar/:id', Auth.verificarToken, GrupoCtrl.listarId)
router.get('/listarPorDocente/:id', Auth.verificarToken, GrupoCtrl.listarPorDocente)
router.delete('/eliminar/:id', Auth.verificarToken, GrupoCtrl.eliminar)
router.put('/actualizar/:id', Auth.verificarToken, GrupoCtrl.actualizar)
router.get('/buscar/:nombre/:id', Auth.verificarToken, GrupoCtrl.buscarGrupo)

module.exports = router
