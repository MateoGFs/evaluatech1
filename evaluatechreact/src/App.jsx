import {BrowserRouter as Router,Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Registro from './components/Registro';
import Menu from './components/Menu';
import Grupos from './components/Grupos';
import Areas from './components/Areas';
import Home from './components/Home';
import Estudiantes from './components/Estudiantes';
import Evaluacion from './components/Evaluacion';
import Preguntas from './components/Preguntas';
import Alternativas from './components/Alternativas';
import Results from './components/Results';
import EvaluacionPrueba from './components/EvaluacionPrueba';



function App() {
  return (
    <Router>
      <Menu/>
    <Route path='/' exact component={Login}/>
    <Route path='/registro' exact component={Registro}/>
    <Route path='/grupos' exact component={Grupos}/>
    <Route path='/estudiantes' exact component={Estudiantes}/>
    <Route path='/evaluacion' exact component={Evaluacion}/>
    <Route path='/preguntas' exact component={Preguntas}/>
    <Route path='/alternativas' exact component={Alternativas}/>
    <Route path='/areas' exact component={Areas}/>
    <Route path='/home' exact component={Home}/>
    <Route path='/evaluation' exact component={EvaluacionPrueba}/>
    <Route path='/results' exact component={Results}/>
    </Router>  
  );
}

export default App;
