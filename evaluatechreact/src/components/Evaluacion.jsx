import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

function Evaluacion() {
    const [areas, setAreas] = useState([])
    const [grupos, setGrupos] = useState([])
    const [evaluaciones, setEvaluaciones] = useState([])

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [areaId, setAreaId] = useState('')
    const [grupoId, setGrupoId] = useState('')
    
    const [idEvaluacion, setIdEvaluacion] = useState('')//Para modificar obtengo id de la evaluacion

    useEffect(() => { //useEffect me permite ejecutar código automáticamente
        obtenerEvaluaciones()
        obtenerAreas()
        obtenerGrupos()
    }, [])
    const limpiarCampos = () => { 
        document.getElementById("form").reset();
    }

    const obtenerEvaluaciones = async()=>{
        const id = sessionStorage.getItem('idusuario')
        // const nombre = sessionStorage.getItem('nombre')
        const token = sessionStorage.getItem('token')
        // const tipo = sessionStorage.getItem('tipo')

        const respuesta = await Axios.get('evaluacion/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        setEvaluaciones(respuesta.data)
    }
    const obtenerGrupos = async()=>{
        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('grupo/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        setGrupos(respuesta.data)
    }
    const obtenerAreas = async()=>{
        const id = sessionStorage.getItem('idusuario')
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.get('area/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        setAreas(respuesta.data)
    }
    
    const obtenerEvaluacionEditar = async(idParametro)=>{//Para cargar los datos en el form para editar
        const id = idParametro
        const token = sessionStorage.getItem('token')
        const respuesta= await Axios.get('/evaluacion/listar/'+id,{
            headers:{'autorizacion':token} 
        })
        console.log(respuesta.data);
        setIdEvaluacion(respuesta.data._id)
        setNombre(respuesta.data.nombre)
        setDescripcion(respuesta.data.descripcion)
        setAreaId(respuesta.data.areaId)
        setGrupoId(respuesta.data.grupoId)
    }

    const actualizar = async(e)=>{
        e.preventDefault();
        const id = idEvaluacion
        const token= sessionStorage.getItem('token')
        const newEvaluacion={
            nombre,
            descripcion,
            areaId,
            grupoId
        }

        const respuesta= await Axios.put('/evaluacion/actualizar/'+id,newEvaluacion,{
            headers:{'autorizacion':token}
        })
        
        const mensaje=respuesta.data.mensaje  
        obtenerEvaluaciones()    
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
        const respuesta = await Axios.delete('/evaluacion/eliminar/'+id,{headers:{'autorizacion':token}}) 
        const mensaje=respuesta.data.mensaje
        Swal.fire({ 
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        }) 
        obtenerEvaluaciones()          
    }
    const crear = async(e)=>{
        e.preventDefault();
        limpiarCampos();
        const nuevaEvaluacion={
            nombre,
            descripcion,
            areaId,
            grupoId,
            docenteId: sessionStorage.getItem('idusuario')
        }
        const token = sessionStorage.getItem('token')
        const respuesta=await Axios.post('/evaluacion/crear',nuevaEvaluacion,{headers:{'autorizacion':token}})

        const mensaje = respuesta.data.mensaje
        console.log(respuesta.data.mensaje)
        obtenerEvaluaciones()
        setTimeout(()=>{
            window.location.href='/evaluacion'

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
            return obtenerEvaluaciones()
        }
        const buscar= e.target.value
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.get(`/evaluacion/buscar/${buscar}/${sessionStorage.getItem('idusuario')}`,{
            headers:{'autorizacion':token}

        })
        setEvaluaciones(respuesta.data)
    }
    return (
        <div>
        <header className='p'>
           <div className="container">
               <div className="row">
                   <div className="col-md-6">
                       <h1><i className='fas fa-file-alt'> Evaluaciones</i></h1>
                   </div>
               </div>
           </div>
       </header>      
       <nav className="navbar py-4">
           <div className="container">   
           <div className="col-md-3">
               <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addGrupo">
                   <i className='fas fa-plus'></i>
                   Programar Evaluación          
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
                               <th scope="col">NOMBRE</th>
                               <th scope="col">DESCRIPCION</th>
                               <th scope="col">FECHA</th>
                               <th scope="col">ID AREA</th>
                               <th scope="col">ID GRUPO</th>
                               <th scope="col">ACCIONES</th>
                               </tr>
                           </thead>
                           <tbody>
                               {
                                   evaluaciones.map((evaluacion,i)=>(

                                       <tr key={evaluacion._id}>
                                           <td>{i+1}</td>
                                           <td>{evaluacion.nombre}</td> 
                                           <td>{evaluacion.descripcion}</td>
                                           <td>{evaluacion.fecha}</td> 
                                           <td>{evaluacion.areaId}</td>
                                           <td>{evaluacion.grupoId}</td>                                               
                                           <td>
                                               <button className='btn btn-warning mr-1' data-toggle="modal" data-target="#editGrupo" onClick={()=>obtenerEvaluacionEditar(evaluacion._id)}>Editar</button>
                                               <button className='btn btn-danger mr-1' onClick={()=>eliminar(evaluacion._id)}>Eliminar</button>
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
           <h5 className='modal-title'>Programar Evaluación</h5>
           <button className='close'  data-dismiss='modal'>
               <span>&times;</span>
           </button>
           </div>
           <div className="modal-body">
               <form id="form" onSubmit={crear}>
                   <div className="form-group">
                       <label >Nombre</label>
                       <input type="text" className='form-control' required onChange={(e)=>setNombre(e.target.value)}/>
                   </div>
                   <div className="form-group">
                       <label >Descripción</label>
                       <input type="text" className='form-control' required onChange={(e)=>setDescripcion(e.target.value)}/>
                   </div>
                   <div className="form-group">
                       <label >Área</label>
                       <select className='form-control' onChange={(e)=> setAreaId(e.target.value)}>
                          <option value="0" selected disabled>Seleccione área</option>                    
                           {
                               areas.map(area=>(
                                   <option key={area._id} value={area._id}>
                                       {area.nombre}  
                                   </option>     
                               ))
                           }
                       </select>
                   </div>     
                   <div className="form-group">
                       <label >Grupo</label>
                       <select className='form-control' onChange={(e)=> setGrupoId(e.target.value)}>
                       <option value="" selected disabled>Seleccione grupo</option>                     
                           {
                               grupos.map(grupo=>(
                                   <option key={grupo._id} value={grupo._id}>
                                       {grupo.nombre}  
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
           <h5 className='modal-title'>Editar Evaluación</h5>
           <button className='close'  data-dismiss='modal'>
               <span>&times;</span>
           </button>
           </div>
           <div className="modal-body">
               <form onSubmit={actualizar}>
                   <div className="form-group">
                       <label>Nombre</label>
                       <input type="text" className="form-control" required onChange={e => setNombre(e.target.value)} value={nombre}/>
                   </div>
                   <div className="form-group">
                       <label>Descripción</label>
                       <input type="text" className="form-control" required onChange={e => setDescripcion(e.target.value)} value={descripcion}/>
                   </div>
                   <div className="form-group">
                       <label >Area</label>
                       <select className='form-control' required  onChange={e => setAreaId(e.target.value)} value={areaId}>                    
                           {
                               areas.map(area=>(
                                   <option key={area._id} value={area._id}>
                                       {area.nombre}  
                                   </option>     
                               ))
                           }
                       </select>
                   </div>
                   <div className="form-group">
                       <label >Grupo</label>
                       <select className='form-control' required  onChange={e => setGrupoId(e.target.value)} value={grupoId}>                    
                           {
                               grupos.map(grupo=>(
                                   <option key={grupo._id} value={grupo._id}>
                                       {grupo.nombre}  
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

export default Evaluacion
