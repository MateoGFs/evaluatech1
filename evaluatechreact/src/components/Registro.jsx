import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Registro() {
    const [identificacion, setIdentificacion] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [celular, setCelular] = useState('')
    const [clave, setClave] = useState('') 

    const limpiarCampos = () => { 
        document.getElementById("form").reset();
    }

    const Registro = async(e)=>{
        e.preventDefault();//Para evitar recargar la página
        const usuario = {identificacion, nombre, apellido, celular, clave}
        const respuesta = await Axios.post('/docente/crear', usuario);
        const mensaje = respuesta.data.mensaje    //con data obtengo datos desde backend
        if(mensaje!=='Registro exitoso'){

            Swal.fire({
                icon:'error',
                title: mensaje,
                text: 'Something went wrong!'
            })
            limpiarCampos();

        } else {
            // const token = respuesta.data.token
            // const nombre = respuesta.data.nombre
            // const idusuario = respuesta.data.id
            
            // sessionStorage.setItem('token', token)
            // sessionStorage.setItem('nombre', nombre)
            // sessionStorage.setItem('idusuario', idusuario)
            window.location.href='/'
            Swal.fire({
                icon:'success',
                title: mensaje,
                text: 'Something went wrong!'
            })

        }

    }

    return (
        <div>
        <div className="container">
            <div className="body"></div>
            <div className="grad"></div>
            <div className="header">
                <div>Registro Evalua<span>Tech</span></div>
            </div>
            <br />
            <div className="login">
                <form id="form" onSubmit={Registro}>
                    <input type="text" placeholder="Identificación del docente" autoFocus required onChange={(e)=>setIdentificacion(e.target.value)}/>
                    <input type="text" placeholder="Nombre del docente"  required onChange={(e)=>setNombre(e.target.value)}/>
                    <input type="text" placeholder="Apellido del docente" required onChange={(e)=>setApellido(e.target.value)}/>
                    <input type="text" placeholder="Celular del docente" required onChange={(e)=>setCelular(e.target.value)}/>
                    <input type="password" placeholder="Clave del docente" required onChange={(e)=>setClave(e.target.value)}/>
                    <input type="submit" value="Registrarse" />
                    <Link id="i" to="/"><button type="button">Volver</button></Link>
                </form>
               
           </div>
           </div>

        <style scoped type="text/css">
            {`
               @import url(https://fonts.googleapis.com/css?family=Exo:100,200,400);
               @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:700,400,300);
               
               .body {
                    position: fixed;
                    top: -20px;
                    left: -20px;
                    right: -40px;
                    bottom: -40px;
                    width: 1300;
                     height: 1300;
                    background-color: rgb(13, 65, 47);
                    background-size: cover;
                    -webkit-filter: blur(5px);
                    z-index: 0;
                }
                ::-webkit-scrollbar {
                    display: none;
                }
               
               
               .header {
                   position: absolute;
                   top: calc(50% - 35px);
                   left: calc(50% - 395px);
                   z-index: 2;
               }
               
               .header div {     
                   color: #fff;
                   font-family: "Exo", sans-serif;
                   font-size: 35px;
                   font-weight: 300;
               }
               
               
               .header div span {
                   color: #5379fa !important;
               }
               
               .login {
                   position: absolute;
                   /* top: calc(50% - 75px); */
                   top: calc(39% - 75px);
                   left: calc(50% - 50px);
                   height: 450px;
                   width: 350px;
                   padding: 10px;
                   z-index: 2;
               }
               
               .login input[type="text"] {
                   width: 250px;
                   height: 30px;
                   background: transparent;
                   border: 1px solid rgba(255, 255, 255, 0.6);
                   border-radius: 2px;
                   color: #fff;
                   font-family: "Exo", sans-serif;
                   font-size: 16px;
                   font-weight: 400;
                   padding: 4px;
                   margin-top: 10px;
               }
               
               .login input[type="email"] {
                   width: 250px;
                   height: 30px;
                   background: transparent;
                   border: 1px solid rgba(255, 255, 255, 0.6);
                   border-radius: 2px;
                   color: #fff;
                   font-family: "Exo", sans-serif;
                   font-size: 16px;
                   font-weight: 400;
                   padding: 4px;
                   margin-top: 10px;
               }
               
               .login input[type="password"] {
                   width: 250px;
                   height: 30px;
                   background: transparent;
                   border: 1px solid rgba(255, 255, 255, 0.6);
                   border-radius: 2px;
                   color: #fff;
                   font-family: "Exo", sans-serif;
                   font-size: 16px;
                   font-weight: 400;
                   padding: 4px;
                   margin-top: 10px;
               }
               
               .login input[type="submit"] {
                   width: 260px;
                   height: 35px;
                   background: #fff;
                   border: 1px solid #fff;
                   cursor: pointer;
                   border-radius: 2px;
                   color: #241f18;
                   font-family: "Exo", sans-serif;
                   font-size: 16px;
                   font-weight: 400;
                   padding: 6px;
                   margin-top: 10px;
               }
               .login button[type="button"] {
                   width: 260px;
                   height: 35px;
                   background: #fff;
                   border: 1px solid #fff;
                   cursor: pointer;
                   border-radius: 2px;
                   color: #241f18;
                   font-family: "Exo", sans-serif;
                   font-size: 16px;
                   font-weight: 400;
                   padding: 6px;
                   margin-top: 10px;
               }
               
               .login input[type="submit"]:hover {
                   opacity: 0.8;
               }
               .login button[type="button"]:hover {
                   opacity: 0.8;
               }
               
               .login input[type="submit"]:active {
                   opacity: 0.6;
               }
               .login button[type="button"]:active {
                   opacity: 0.6;
               }
               
               .login input[type="text"]:focus {
                   outline: none;
                   border: 1px solid rgba(255, 255, 255, 0.9);
               }
               
               .login input[type="password"]:focus {
                   outline: none;
                   border: 1px solid rgba(255, 255, 255, 0.9);
               }
               
               .login input[type="button"]:focus {
                   outline: none;
               }
               
               ::-webkit-input-placeholder {
                   color: rgba(255, 255, 255, 0.6);
               }
               
               ::-moz-input-placeholder {
                   color: rgba(255, 255, 255, 0.6);
               }
               
            `}
        </style>    
        </div>
    )
}

export default Registro
