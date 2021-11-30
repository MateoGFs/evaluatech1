import React, { useEffect } from 'react';
import Axios from 'axios';


const EvaluacionPrueba = () => {

    let evaluaciones = [];
    let estudiantes = [];
    let preguntas = [];
    let alternativas = [];

    useEffect(() => {
        obtenerEvaluaciones()
        obtenerEstudiantes()
        obtenerPreguntas()
        obtenerAlternativas()
    });

    const obtenerEvaluaciones = async () => {
        const respuesta = await Axios.get('evaluacion/listarE/');
        evaluaciones = respuesta.data
    }

    const obtenerEstudiantes = async () => {
        const respuesta = await Axios.get('estudiante/listarE/');
        estudiantes = respuesta.data
    }

    const obtenerPreguntas = async () => {
        const respuesta = await Axios.get('pregunta/listarE/')
        preguntas = respuesta.data;
    }

    const obtenerAlternativas = async () => {
        const respuesta = await Axios.get('alternativa/listarE/')
        alternativas = respuesta.data;
    }

    const cargarEva = () => {
        let opts = document.getElementById("evalua");
        //Este Id corresponde al del estudiante que ingresa
        const idEs = sessionStorage.getItem('idusuario')

            for (let i = 0; i < estudiantes.length; i++) {

                for (let j = 0; j < evaluaciones.length; j++) {

                    if (
                        evaluaciones[j].grupoId === estudiantes[i].grupoId &&
                        idEs === estudiantes[i]._id 
                    ) {

                        let option = document.createElement("option");
                        option.setAttribute("value", evaluaciones[j]._id);
                        option.appendChild(
                        document.createTextNode(evaluaciones[j].nombre)
                        );
                        opts.appendChild(option);
                        break;
                    }
                } 
            }
        estudiantes = ""; 
            
    }

    const cargarPreg = () => {
        let sel = document.getElementById("evalua").value;
        let container = document.querySelector("#contenido");
        // container.style.border = "2px solid black";
        container.innerHTML = "";
        document.getElementById("btn-enviar").hidden = true;
        for (let i = 0; i < preguntas.length; i++) {
            
            if (preguntas[i].evaluacionId === sel) {
                
                let myDivs = document.createElement("div");
                myDivs.id = "div" + i;
                myDivs.innerHTML = "<br><h3>" + preguntas[i].enunciado + "</h3>";

                container.appendChild(myDivs);
                for (let j = 0; j < alternativas.length; j++) {
                    if (alternativas[j].preguntaId === preguntas[i]._id) {
                        let container2 = document.getElementById('div' + i);
                        let myDiv = document.createElement("div");
                        myDiv.innerHTML = "<input type=\"radio\" class=\"form-check-input\" id=\"uno\" name=respu" + i + " value=" + alternativas[j].valor + " required><label for=\"uno\" class=\"form-check-label\">" + alternativas[j].respuesta + "</label><br>";
                        container2.appendChild(myDiv);
                    }
                }
                document.getElementById("btn-enviar").hidden = false;
            }
        }
    }

    const calcularNota = async () => {
        let sel = document.getElementById("evalua").value;
        let puntos = 0;
        const idEs = sessionStorage.getItem('idusuario')
        let totalPreg = 0;
        let docente = '';
        for (let i = 0; i < preguntas.length; i++) {

            if (preguntas[i].evaluacionId === sel) {
                totalPreg++;
                docente = preguntas[i].docenteId;
                let res = "";
                let resp = document.getElementsByName("respu" + i);
                resp.forEach((rp) => {
                    if (rp.checked) {
                        res = rp.value;
                    }
                });
                if (res === "true") {
                    puntos = puntos + 1;
                }
            }
        }

        //alert("El total de puntos bien es " + puntos + "\nSu nota es " + (5 / totalPreg * puntos).toFixed(1));
        let container = document.querySelector("#contenido");
        
        alert(docente)
        container.innerHTML = "";
        document.getElementById("btn-enviar").hidden = true;
        let notaFinal=(5 / totalPreg * puntos).toFixed(1);
        alert('su nota: ' + notaFinal + 'puntos: '+ puntos + 'numero de preguntas: '+ totalPreg)
        let ObjetoNota = {
            nota: notaFinal,
            estudianteId: idEs,
            evaluacionId: sel,
            docenteId: docente    
        }

        await Axios.post('/nota/crear', ObjetoNota)
        alert('Nota registrada')
    }

    return (
        <div style={{ paddingLeft: '8rem', paddingRight: '8rem' }}>
            <h1 style={{ textAlign: 'center', marginTop: '2rem', marginBottom: '2rem' }}>Sus Evaluaciones</h1>
            <div className="row">
                <h3 style={{ marginBottom: '0.5rem' }}>Seleccione Evaluacion</h3>
                <select id="evalua" style={{ width: '100%', height: '2.5rem' }} onChange={cargarPreg} onClick={cargarEva}>
                    <option value="0" selected>Seleccione evaluacion</option>
                </select>
            </div>
            <div className="row">
                <form onSubmit={calcularNota}>
                    <div id="contenido"></div>
                    <div style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                        <button id="btn-enviar" type="submit" hidden="true" style={{ width: '20rem', backgroundColor: 'green', color: 'white', height: '2.5rem' }}>
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default EvaluacionPrueba
