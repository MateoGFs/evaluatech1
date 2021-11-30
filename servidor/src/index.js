const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

require('./database')

app.use(morgan('dev'))

app.use(express.json()); 
//application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origen: '*' }))

//Rutas
app.use('/docente', require('./routes/Docente.route'))
app.use('/estudiante', require('./routes/Estudiante.route'))
app.use('/grupo', require('./routes/Grupo.route'))
app.use('/area', require('./routes/Area.route'))
app.use('/evaluacion', require('./routes/Evaluacion.route'))
app.use('/pregunta', require('./routes/Pregunta.route'))
app.use('/alternativa', require('./routes/Alternativa.route'))
app.use('/nota', require('./routes/Nota.route'))

//Puerto
app.set('puerto', process.env.PORT || 4000); 
app.listen(app.get('puerto'), function () { 
    console.log('Example app listening on port'+ app.get('puerto')); 
});