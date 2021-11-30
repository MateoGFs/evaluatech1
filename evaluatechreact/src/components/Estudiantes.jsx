import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

function Estudiantes() {
    const [grupos, setGrupos] = useState([])
    const [estudiantes, setEstudiantes] = useState([])
    const [identificacion, setIdentificacion] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [clave, setClave] = useState('')
    const [grupoId, setGrupoId] = useState('')
    
    const [idEstudiante, setIdEstudiante] = useState('')//Para modificar obtengo id del estudiante

    useEffect(() => { //useEffect me permite ejecutar código automáticamente
        obtenerEstudiantes()
        obtenerGrupos()
    }, [])
    const limpiarCampos = () => { 
        document.getElementById("form").reset();
    }

    const obtenerEstudiantes = async()=>{
        const id = sessionStorage.getItem('idusuario')
        // const nombre = sessionStorage.getItem('nombre')
        const token = sessionStorage.getItem('token')
        // const tipo = sessionStorage.getItem('tipo')

        const respuesta = await Axios.get('estudiante/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        setEstudiantes(respuesta.data)
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
    
    const obtenerEstudianteEditar = async(idParametro)=>{//Para cargar los datos en el form para editar
        const id = idParametro
        const token = sessionStorage.getItem('token')
        const respuesta= await Axios.get('/estudiante/listar/'+id,{
            headers:{'autorizacion':token} 
        })
        console.log(respuesta.data);
        setIdEstudiante(respuesta.data._id)
        setIdentificacion(respuesta.data.identificacion)
        setNombre(respuesta.data.nombre)
        setApellido(respuesta.data.apellido)
        setClave(respuesta.data.clave)
        setGrupoId(respuesta.data.grupoId)
    }

    const actualizar = async(e)=>{
        e.preventDefault();
        const id = idEstudiante
        const token= sessionStorage.getItem('token')
        const newEstudiante={
            identificacion,
            nombre,
            apellido,
            clave,
            grupoId
        }

        const respuesta= await Axios.put('/estudiante/actualizar/'+id,newEstudiante,{
            headers:{'autorizacion':token}
        })
        
        const mensaje=respuesta.data.mensaje  
        obtenerEstudiantes()    
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
        const respuesta = await Axios.delete('/estudiante/eliminar/'+id,{headers:{'autorizacion':token}}) 
        const mensaje=respuesta.data.mensaje
        Swal.fire({ 
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        }) 
        obtenerEstudiantes()          
    }
    const crear = async(e)=>{
        e.preventDefault();
        limpiarCampos();
        const nuevoEstudiante={
            identificacion,
            nombre,
            apellido,
            clave,
            grupoId,
            docenteId: sessionStorage.getItem('idusuario')
        }
        const token = sessionStorage.getItem('token')
        const respuesta=await Axios.post('/estudiante/crear',nuevoEstudiante,{headers:{'autorizacion':token}})

        const mensaje = respuesta.data.mensaje
        console.log(respuesta.data.mensaje)
        obtenerEstudiantes()
        setTimeout(()=>{
            window.location.href='/estudiantes'

        },1000)
        Swal.fire({           
            icon: 'info',
            title: mensaje,
            showConfirmButton: false,
            timer: 1000
        })
        
    }

    const buscar=async(e)=>{
        if(e.target.value===''){
            return obtenerEstudiantes()
        }
        const buscar= e.target.value
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.get(`/estudiante/buscar/${buscar}/${sessionStorage.getItem('idusuario')}`,{
            headers:{'autorizacion':token}

        })
        setEstudiantes(respuesta.data)
    }

    return (
        <div>
             <header className='p'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className='fas fa-user-cog'> Estudiantes</i></h1>
                        </div>
                    </div>
                </div>
            </header>      
            <nav className="navbar py-4">
                <div className="container">   
                <div className="col-md-3">
                    <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addGrupo">
                        <i className='fas fa-plus'></i>
                        Registrar Estudiante             
                    </Link>
                </div>
                <div className="col-md-6 ml-auto">
                    <div className="input-group">
                        <input className='form-control mr-sm-2' type="search" onChange={(e)=>buscar(e)} placeholder= 'Buscar...'aria-label='Search'/>
                    </div>
                </div>
                </div>
            </nav>

        {/* mostrar estudiantes */}

        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <table className="table table-responsive-lg table-striped">
                                <thead className='thead-dark'>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">IDENTIFICACIÓN</th>
                                    <th scope="col">NOMBRES</th>
                                    <th scope="col">APELLIDOS</th>
                                    <th scope="col">ID GRUPO</th>
                                    <th scope="col">TIPO</th>
                                    <th scope="col">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        estudiantes.map((estudiante,i)=>(

                                            <tr key={estudiante._id}>
                                                <td>{i+1}</td>
                                                <td>{estudiante.identificacion}</td> 
                                                <td>{estudiante.nombre}</td>
                                                <td>{estudiante.apellido}</td> 
                                                <td>{estudiante.grupoId}</td>
                                                <td>{estudiante.tipo}</td>                                               
                                                <td>
                                                    <button className='btn btn-warning mr-1' data-toggle="modal" data-target="#editGrupo" onClick={()=>obtenerEstudianteEditar(estudiante._id)}>Editar</button>
                                                    <button className='btn btn-danger mr-1' onClick={()=>eliminar(estudiante._id)}>Eliminar</button>
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
                <h5 className='modal-title'>Registrar Estudiante</h5>
                <button className='close'  data-dismiss='modal'>
                    <span>&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    <form id="form" onSubmit={crear}>
                        <div className="form-group">
                            <label >Identificación</label>
                            <input type="text" className='form-control' required autoFocus onChange={(e)=>setIdentificacion(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Nombres</label>
                            <input type="text" className='form-control' required onChange={(e)=>setNombre(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Apellidos</label>
                            <input type="text" className='form-control' required onChange={(e)=>setApellido(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Contraseña</label>
                            <input type="password" className='form-control' required onChange={(e)=>setClave(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label >Grupo</label>
                            <select className='form-control' onChange={(e)=> setGrupoId(e.target.value)}>  
                            <option value="0" selected disabled>Seleccione grupo</option>                   
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
                <h5 className='modal-title'>Editar Estudiante</h5>
                <button className='close'  data-dismiss='modal'>
                    <span>&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={actualizar}>
                        <div className="form-group">
                            <label>Identificación</label>
                            <input type="text" className="form-control" required onChange={e => setIdentificacion(e.target.value)} value={identificacion}/>
                        </div>
                        <div className="form-group">
                            <label>Nombres</label>
                            <input type="text" className="form-control" required onChange={e => setNombre(e.target.value)} value={nombre}/>
                        </div>
                        <div className="form-group">
                            <label>Apellidos</label>
                            <input type="text" className="form-control" required onChange={e => setApellido(e.target.value)} value={apellido}/>
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" required onChange={e => setClave(e.target.value)} value={clave}/>
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

export default Estudiantes
