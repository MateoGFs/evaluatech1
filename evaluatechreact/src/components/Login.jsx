import React, {useState} from 'react'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

function Login() {
    const [identificacion, setIdentificacion] = useState('')
    const[clave, setClave] = useState('') 

    const Login = async(e)=>{
        e.preventDefault();//Para evitar recargar la página
        const usuario = {identificacion, clave}
        const respuesta = await Axios.post('/docente/loginPrueba', usuario);
        const mensaje = respuesta.data.mensaje    //con data obtengo datos desde backend
        if(mensaje!=='Bienvenido'){
            Swal.fire({
                icon:'error',
                title: mensaje,
                text: 'Something went wrong!'
            })

        } else {
            const token = respuesta.data.token
            const nombre = respuesta.data.nombre
            const idusuario = respuesta.data.id
            const tipo = respuesta.data.tipo

            sessionStorage.setItem('token', token)
            sessionStorage.setItem('nombre', nombre)
            sessionStorage.setItem('idusuario', idusuario)
            sessionStorage.setItem('tipo', tipo)

            window.location.href="/home"

            Swal.fire({
                icon:'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })
            
        }
       

    }
    
    return (
        <div class="container">
            <div class="body"></div>
            <div class="grad"></div>
            <div class="header">
                <div>Evalua<span>Tech</span></div>
            </div>
            <br />
            <div class="login">
                <form onSubmit={Login}>
                    <input type="text" placeholder="Identificación" autoFocus required onChange={(e)=>setIdentificacion(e.target.value)}/>
                    <input type="password" placeholder="Contraseña" required onChange={(e)=>setClave(e.target.value)}/>
                    <button type="submit">Iniciar</button>
                </form>
                <Link id="i" to="/registro"><button type ="button">Registrarse</button></Link>
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
                    
                    
                    .header {
                        position: absolute;
                        top: calc(50% - 35px);
                        left: calc(50% - 255px);
                        z-index: 2;
                    }
                    
                    .header div {
                        float: left;
                        color: #fff;
                        font-family: "Exo", sans-serif;
                        font-size: 35px;
                        font-weight: 200;
                    }
                    
                    .header div span {
                        color: #5379fa !important;
                    }
                    
                    .login {
                        position: absolute;
                        top: calc(50% - 75px);
                        left: calc(50% - 50px);
                        height: 150px;
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
                    
                    .login input[type="button"] {
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
                    
                    .login button[type="submit"] {
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
                    
                    .login button[type="button"]:hover {
                        opacity: 0.8;
                    }
                    
                    .login button[type="submit"]:hover {
                        opacity: 0.8;
                    }
                    
                    .login input[type="button"]:active {
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

export default Login
