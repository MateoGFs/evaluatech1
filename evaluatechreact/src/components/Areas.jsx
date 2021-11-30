import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Swal from 'sweetalert2'

function Areas() {

    const [areas, setAreas] = useState([])
    const [nombre, setNombre] = useState('')
    
    const [idArea, setIdArea] = useState('')//Para modificar obtengo id del area

    useEffect(() => { //useEffect me permite ejecutar código automáticamente
        obtenerAreas()
    }, [])

    const limpiarCampos = () => { 
        document.getElementById("form").reset();
    }

    const obtenerAreas = async()=>{
        const id = sessionStorage.getItem('idusuario')
        // const nombre = sessionStorage.getItem('nombre')
        const token = sessionStorage.getItem('token')
        // const tipo = sessionStorage.getItem('tipo')

        const respuesta = await Axios.get('area/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        setAreas(respuesta.data)
    }
    
    const obtenerAreaEditar = async(idParametro)=>{//Para cargar los datos en el form para editar
        const id = idParametro
        const token = sessionStorage.getItem('token')
        const respuesta= await Axios.get('/area/listar/'+id,{
            headers:{'autorizacion':token} 
        })
        console.log(respuesta.data);
        setIdArea(respuesta.data._id)
        setNombre(respuesta.data.nombre)
    }

    const actualizar = async(e)=>{
        e.preventDefault();
        const id = idArea
        const token= sessionStorage.getItem('token')
        const newArea={
            nombre
        }

        const respuesta= await Axios.put('/area/actualizar/'+id,newArea,{
            headers:{'autorizacion':token}
        })
        
        const mensaje=respuesta.data.mensaje  
        obtenerAreas()    
        Swal.fire({
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
            // setTimeout(()=>{
            //       window.location.href='/areas'
            // },1500)
                 
    }

    const eliminar = async(id)=>{
        const token = sessionStorage.getItem('token')
        const respuesta = await Axios.delete('/area/eliminar/'+id,{headers:{'autorizacion':token}}) 
        const mensaje=respuesta.data.mensaje
        Swal.fire({ 
            icon: 'error',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        }) 
        obtenerAreas()          
    }
    const crear = async(e)=>{
        e.preventDefault();
        limpiarCampos();
        const nuevaArea={
            nombre,
            docenteId: sessionStorage.getItem('idusuario')
        }
        const token = sessionStorage.getItem('token')
        const respuesta=await Axios.post('/area/crear',nuevaArea,{headers:{'autorizacion':token}})

        const mensaje = respuesta.data.mensaje
        obtenerAreas()
        Swal.fire({           
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
        // setTimeout(()=>{
        //     window.location.href='/areas'

        // },1500)
    }

    const buscar=async(e)=>{
        if(e.target.value===''){
            return obtenerAreas()
        }
        const buscar= e.target.value
        const token= sessionStorage.getItem('token')
        const respuesta= await Axios.get(`/area/buscar/${buscar}/${sessionStorage.getItem('idusuario')}`,{
            headers:{'autorizacion':token}
        })
        setAreas(respuesta.data)
    }
    return (
        <div>
             <header className='p'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1><i className="fas fa-book-open"> Áreas</i></h1>
                        </div>
                    </div>
                </div>
            </header>      
            <nav className="navbar py-4">
                <div className="container">   
                <div className="col-md-3">
                    <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addGrupo">
                        <i className='fas fa-plus'></i>
                        Agregar Área            
                    </Link>
                </div>

                <div className="col-md-6 ml-auto">
                    <div className="input-group">
                        <input className='form-control mr-sm-2' type="search" onChange={(e)=>buscar(e)} placeholder= 'Buscar...'aria-label='Search'/>
                    </div>
                </div>
                </div>
            </nav>

        {/* mostrar áreas */}

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
                                    <th scope="col">ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        areas.map((area,i)=>(

                                            <tr key={area._id}>
                                                <td>{i+1}</td>
                                                <td>{area.nombre}</td>                                             
                                                <td>
                                                    <button className='btn btn-warning mr-1' data-toggle="modal" data-target="#editGrupo" onClick={()=>obtenerAreaEditar(area._id)}>Editar</button>
                                                    <button className='btn btn-danger mr-1' onClick={()=>eliminar(area._id)}>Eliminar</button>
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
                <h5 className='modal-title'>Agregar Área</h5>
                <button className='close'  data-dismiss='modal'>
                    <span>&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    <form id="form" onSubmit={crear}>
                        <div className="form-group">
                            <label >Nombre</label>
                            <input type="text" className='form-control' required autoFocus onChange={(e)=>setNombre(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <button className='btn btn-primary' data-toggle="modal" data-target="#addGrupo" type='submit'>Guardar</button>
                        </div>                       
                    </form>
                </div>
            </div>
        </div>

        </div>

    {/*modal editar*/}    
    <div className="modal fade"   id='editGrupo'>
            <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header bg-warning text-black">
                <h5 className='modal-title'>Editar Área</h5>
                <button className='close'  data-dismiss='modal'>
                    <span>&times;</span>
                </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={actualizar}>
                        <div className="form-group">
                            <label>Nombres</label>
                            <input type="text" className="form-control" required onChange={e => setNombre(e.target.value)} value={nombre}/>
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

export default Areas
