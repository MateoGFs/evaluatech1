const {Router} = require('express')
const router = Router()
const DocenteCtrl = require('../controllers/Docente.controllers')

router.post('/crear', DocenteCtrl.crearDocente)
// router.post('/login', DocenteCtrl.login)
router.post('/loginPrueba', DocenteCtrl.loginprueba)

module.exports = router