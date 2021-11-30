import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'


function Preguntas() {
    const [evaluaciones, setEvaluaciones] = useState([])
    const [preguntas, setPreguntas] = useState([])

    const [enunciado, setEnunciado] = useState('')
    const [evaluacionId, setEvaluacionId] = useState()
    
    const [idPregunta, setIdPregunta] = useState('')//Para modificar obtengo id de la pregunta

    const limpiarCampos = () => { 
        document.getElementById("form").reset();
    }

    useEffect(() => { //useEffect me permite ejecutar código automáticamente
        obtenerPreguntas()
        obtenerEvaluaciones()
    }, [])

    const obtenerPreguntas = async()=>{
        const id = sessionStorage.getItem('idusuario')
        // const nombre = sessionStorage.getItem('nombre')
        const token = sessionStorage.getItem('token')
        // const tipo = sessionStorage.getItem('tipo')

        const respuesta = await Axios.get('pregunta/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        setPreguntas(respuesta.data)
    }
    const obtenerEvaluaciones = async()=>{
        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('evaluacion/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        setEvaluaciones(respuesta.data)
    }
    
    const obtenerPreguntaEditar = async(idParametro)=>{//Para cargar los datos en el form para editar
        const id = idParametro
        const token = sessionStorage.getItem('token')
        const respuesta= await Axios.get('/pregunta/listar/'+id,{
            headers:{'autorizacion':token} 
        })
        console.log(respuesta.data);
        setIdPregunta(respuesta.data._id)
        setEnunciado(respuesta.data.enunciado)
        setEvaluacionId(respuesta.data.evaluacionId)
    }

    const actualizar = async(e)=>{
        e.preventDefault();
        const id = idPregunta
        const token= sessionStorage.getItem('token')
        const newPregunta={
            enunciado,
            evaluacionId
        }

        const respuesta= await Axios.put('/pregunta/actualizar/'+id,newPregunta,{
            headers:{'autorizacion':token}
        })
        
        const mensaje=respuesta.data.mensaje  
        obtenerPreguntas()    
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
            // setTimeout(()=>{
            //       window.location.href='/grupos'
            // },1500)
                 
    }

    const eliminar = async(id)=>{
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('/pregunta/eliminar/'+id,{headers:{'autorizacion':token}}) 
        const mensaje=respuesta.data.mensaje
        Swal.fire({ 
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        }) 
        obtenerPreguntas()          
    }
    const crear = async(e)=>{
        e.preventDefault();
        limpiarCampos();
        const nuevaPregunta={
            enunciado,
            evaluacionId,
            docenteId: sessionStorage.getItem('idusuario')
        }
        
        const token = sessionStorage.getItem('token')
        const respuesta=await Axios.post('/pregunta/crear',nuevaPregunta,{headers:{'autorizacion':token}})
        console.log(respuesta.data.evaluacionId)
        const mensaje = respuesta.data.mensaje
        
        obtenerPreguntas()
        
        setTimeout(()=>{
            window.location.href='/preguntas'

        },1000)
        Swal.fire({           
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    }

    const buscar=async(e)=>{
        if(e.target.value===''){
            return obtenerPreguntas()
        }
        const buscar= e.target.value
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.get(`/pregunta/buscar/${buscar}/${sessionStorage.getItem('idusuario')}`,{
            headers:{'autorizacion':token}

        })
        setPreguntas(respuesta.data)
    }
    return (
        <div>
        <header className='p'>
           <div className="container">
               <div className="row">
                   <div className="col-md-6">
                       <h1><i className='fas fa-question-circle'> Preguntas</i></h1>
                   </div>
               </div>
           </div>
       </header>      
       <nav className="navbar py-4">
           <div className="container">   
           <div className="col-md-3">
               <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addGrupo">
                   <i className='fas fa-plus'></i>
                   Registrar Pregunta          
               </Link>
           </div>
           <div className="col-md-6 ml-auto">
               <div className="input-group">
                   <input className='form-control mr-sm-2' type="search" onChange={(e)=>buscar(e)} placeholder= 'Buscar...'aria-label='Search'/>
               </div>
           </div>
           </div>
       </nav>

   {/* mostrar evaluacion */}

   <section>
       <div className="container">
           <div className="row">
               <div className="col-md-12">
                   <div className="card">
                       <table className="table table-responsive-lg table-striped">
                           <thead className='thead-dark'>
                               <tr>
                               <th scope="col">#</th>
                               <th scope="col">ENUNCIADO</th>
                               <th scope="col">ID EVALUACION</th>
                               <th scope="col">ACCIONES</th>
                               </tr>
                           </thead>
                           <tbody>
                               {
                                   preguntas.map((pregunta,i)=>(

                                       <tr key={pregunta._id}>
                                           <td>{i+1}</td>
                                           <td>{pregunta.enunciado}</td> 
                                           <td>{pregunta.evaluacionId}</td>                                              
                                           <td>
                                               <button className='btn btn-warning mr-1' data-toggle="modal" data-target="#editGrupo" onClick={()=>obtenerPreguntaEditar(pregunta._id)}>Editar</button>
                                               <button className='btn btn-danger mr-1' onClick={()=>eliminar(pregunta._id)}>Eliminar</button>
                                           </td>
                                       </tr>
                                   ))
                              }
                           </tbody>
                           </table>
                   </div>
               </div>
           </div>                
       </div>
   </section>

{/*modal agregar*/}
   <div className="modal fade" id='addGrupo'>
       <div className="modal-dialog modal-lg">
       <div className="modal-content">
           <div className="modal-header bg-primary text-white">
           <h5 className='modal-title'>Registrar Pregunta</h5>
           <button className='close'  data-dismiss='modal'>
               <span>&times;</span>
           </button>
           </div>
           <div className="modal-body">
               <form id="form" onSubmit={crear}>
                   <div className="form-group">
                       <label >Enunciado</label>
                       <input id="myInput" type="text" className='form-control' required onChange={(e)=>setEnunciado(e.target.value)}/>
                   </div>
                   <div className="form-group">
                       <label >Evaluación</label>
                       <select className='form-control' required onChange={(e)=> setEvaluacionId(e.target.value)}> 
                       {/* <option value="0" >No seleccionado</option>   */}
                       <option value="0" selected disabled>No seleccionado</option>                    
                           {
                               evaluaciones.map(evaluacion=>(
                                   <option key={evaluacion._id} value={evaluacion._id}>
                                       {evaluacion.nombre}  
                                   </option>     
                               ))
                           }
                       </select>
                   </div>     
                   <div className="form-group">
                       <button className='btn btn-primary' data-toggle="modal" data-target="#addGrupo" type='submit'>Guardar</button>
                   </div>                       
               </form>
           </div>
       </div>
   </div>
   </div>
{/*modal editar Prueba*/}    
<div className="modal fade"   id='editGrupo'>
       <div className="modal-dialog modal-lg">
       <div className="modal-content">
           <div className="modal-header bg-warning text-black">
           <h5 className='modal-title'>Editar Pregunta</h5>
           <button className='close'  data-dismiss='modal'>
               <span>&times;</span>
           </button>
           </div>
           <div className="modal-body">
               <form onSubmit={actualizar}>
                   <div className="form-group">
                       <label>Enunciado</label>
                       <input type="text" className="form-control" required onChange={e => setEnunciado(e.target.value)} value={enunciado}/>
                   </div>
                   <div className="form-group">
                       <label >Evaluación</label>
                       <select id="select" className='form-control' required  onChange={e => setEvaluacionId(e.target.value)} value={evaluacionId}>                    
                           {
                               evaluaciones.map(evaluacion=>(
                                   <option key={evaluacion._id} value={evaluacion._id}>
                                       {evaluacion.nombre}  
                                   </option>     
                               ))
                           }
                       </select>
                   </div>
                   <div className="form-group">
                       <button className='btn btn-warning'data-toggle="modal" data-target="#editGrupo" type='submit'>Guardar</button>
                   </div>                       
               </form>
           </div>
       </div>
   </div>

   </div>
   <style scoped type="text/css">
   {`
       .p {
           background-color:   #C0FC94;
       }
   `}
   </style>
   </div>
    )
}

export default Preguntas
