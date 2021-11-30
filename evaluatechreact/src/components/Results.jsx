import React, {useEffect, useState} from 'react'
import Axios from 'axios'


const Results = () => {
    // const [tabla, setTabla] = useState([])
    // const [estudiantes, setEstudiantes] = useState([])
    // const [evaluaciones, setEvaluaciones] = useState([])
    // const [notas, setNotas] = useState([])
    let notas = [];
    let tabla = [];
    let estudiantes = [];
    let evaluaciones = [];

    useEffect(() => {
        setTimeout(() => {
            cargarTabla()    
        }, 3000);
        // cargarTabla()   
        obtenerEvaluaciones()
        obtenerNotas()
        obtenerEstudiantes()
    });

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
        // setEstudiantes(respuesta.data)
        estudiantes = respuesta.data
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
        // setEvaluaciones(respuesta.data)
        evaluaciones = respuesta.data
    }
    const obtenerNotas = async()=>{
        const id = sessionStorage.getItem('idusuario')
        // const nombre = sessionStorage.getItem('nombre')
        const token = sessionStorage.getItem('token')
        // const tipo = sessionStorage.getItem('tipo')
        const respuesta = await Axios.get('nota/listarPorDocente/'+id,
        {
            headers:{'autorizacion':token}
        })
        console.log(respuesta.data)
        // setNotas(respuesta.data)
        notas = respuesta.data
    }

    const cargarTabla = async()=>{
        
        for (let i = 0; i < notas.length; i++) {
            for (let a = 0; a < estudiantes.length; a++) {
               for (let j = 0; j < evaluaciones.length; j++) {
                   if(notas[i].estudianteId===estudiantes[a]._id && notas[i].evaluacionId===
                    evaluaciones[j]._id){  
                    tabla.push({    evaluacionId: evaluaciones[j].nombre,
                                    estudianteId: estudiantes[a].nombre,
                                    nota: notas[i].nota})
                                    alert(evaluaciones[j].nombre)
                                    alert(estudiantes[a].nombre)
                                    alert(notas[i].nota)
                   }   
               }    
            }    
        } 
    }

    return (
        <div>
        <header className='p'>
           <div className="container">
               <div className="row">
                   <div className="col-md-6">
                       <h1><i className='fas fa-search-plus'> Reportes</i></h1>
                   </div>
               </div>
           </div>
       </header>      
       <nav className="navbar py-4">
           <div className="container">   
           {/* <div className="col-md-3">
               <Link to="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addGrupo">
                   <i className='fas fa-plus'></i>
                   Agregar Grupo             
               </Link>
           </div> */}
            {/* <button className='btn btn-danger mr-1' onClick={cargarTabla}>ver Resportes</button> */}
           {/* <div className="col-md-6 ml-auto">
               <div className="input-group">
                   <input className='form-control mr-sm-2' type="search" onChange={(e)=>buscar(e)} placeholder= 'Buscar...'aria-label='Search'/>
               </div>
           </div> */}
           </div>
       </nav>

   {/* mostrar grupo */}

   <section>
       <div className="container">
           <div className="row">
               <div className="col-md-12">
                   <div className="card">
                       <table className="table table-responsive-lg table-striped">
                           <thead className='thead-dark'>
                               <tr>
                               <th scope="col">#</th>
                               <th scope="col">EVALUACION</th>
                               <th scope="col">ESTUDIANTE</th>
                               <th scope="col">NOTA</th>
                               </tr>
                           </thead>
                           <tbody>
                               {  tabla.map((tab,i)=>(
                                   <tr key={tab}>
                                   <td>{i+1}</td>    
                                   <td>{tab.evaluacionId}</td>
                                   <td>{tab.estudianteId}</td>
                                   <td>{tab.nota}</td>
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

export default Results