const {Router} = require('express');
const router = Router()
const AreaCtrl = require('../controllers/Area.controllers')
const Auth = require('../helper/Auth')

router.post('/crear', Auth.verificarToken, AreaCtrl.crear)
router.get('/listar', Auth.verificarToken, AreaCtrl.listar)
router.get('/listar/:id', Auth.verificarToken, AreaCtrl.listarId)
router.get('/listarPorDocente/:id', Auth.verificarToken, AreaCtrl.listarPorDocente)
router.delete('/eliminar/:id', Auth.verificarToken, AreaCtrl.eliminar)
router.put('/actualizar/:id', Auth.verificarToken, AreaCtrl.actualizar)
router.get('/buscar/:nombre/:id', Auth.verificarToken, AreaCtrl.buscarArea) 

module.exports=router
