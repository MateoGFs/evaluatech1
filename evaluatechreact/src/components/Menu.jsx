import React, { useState ,useEffect} from 'react'
import { Navbar, Container, Offcanvas, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Menu() {
    const [menu, setMenu] = useState(false)
    const salir=()=>{ //para que al momento de salir se limpien las credenciales de inicion de sesion
        sessionStorage.clear();
        window.location.href='/'
    }
    // const id = sessionStorage.getItem('idusuario')
    // const nombre = sessionStorage.getItem('nombre')
    // const token = sessionStorage.getItem('token')
    const tipo = sessionStorage.getItem('tipo')

    useEffect(() => {
        if (tipo==='D'){
            setMenu(true)
        }
        
        
    }, [tipo])
    return (
    <div>    
        <Navbar  className="menu-color" variant="dark" expand={false}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Link className="navbar-brand" to="/home">Evalua<Navbar.Brand id="t">tech</Navbar.Brand></Link>
                <Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand><Navbar.Brand></Navbar.Brand>
                <Navbar.Brand><i className='fas fa-user'></i> Bienvenido {sessionStorage.getItem('nombre')}</Navbar.Brand>
                <Link onClick={()=>salir()} className="navbar-brand" to="/"><i className='fas fa-user-times'></i> Salir</Link>
               
                <Navbar.Offcanvas id="offcanvasNavbar" placement="start">
                    <Offcanvas.Header className="menu-bar" closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Comienza</Offcanvas.Title>
                    </Offcanvas.Header>
                <Offcanvas.Body className="menu-bar" data-toggle="collapse" data-target="#offcanvasNavbar">
                { 
                    menu? 
                       <div>
                        <Link className="dropdown-item" to="/grupos">Grupos</Link>
                        <NavDropdown.Item className="bar" href="/estudiantes">Estudiantes</NavDropdown.Item>
                        <NavDropdown.Item className="bar" href="/areas">Areas</NavDropdown.Item>
                        <NavDropdown.Item className="bar" href="/evaluacion">Evaluación</NavDropdown.Item>
                        <NavDropdown.Item className="bar" href="/preguntas">Preguntas</NavDropdown.Item>
                        <NavDropdown.Item className="bar" href="/alternativas">Alternativas</NavDropdown.Item>
                        <NavDropdown.Item className="bar" href="/results">Reportes</NavDropdown.Item>
                        </div>
                    :
                        <div>
                        <NavDropdown.Item className="bar" href="/evaluation">Evaluación</NavDropdown.Item>
                        <NavDropdown.Item className="bar" href="/#">Resultados</NavDropdown.Item>
                        </div>
                }
                </Offcanvas.Body>
                </Navbar.Offcanvas>
                
            </Container>
        </Navbar>
    <style scoped type="text/css">
        {`
            .menu-color {
                background-color: rgb(13, 65, 47);
            }
            .menu-bar {
                background-color: rgb(13, 65, 47);
                color: white;
            }
            .dropdown-item {
                color: white;
            }
            #bar {
                color: white;
            }
            #t {
                color: #5379fa;
            }
        `}
    </style>
    </div>

    )
}
export default Menu
