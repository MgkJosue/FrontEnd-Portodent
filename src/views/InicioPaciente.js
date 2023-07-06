import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/InicioPaciente.css';

export default function InicioPaciente() {
  return (
    <div className="inicio-paciente">
      <h1>Bienvenido(a) al Inicio del Paciente</h1>
      <div className="boton-container">
        <Link to="/paciente-form"><button>REGISTRO PACIENTE</button></Link>
        <Link to="/buscar-paciente"><button>BUSCAR PACIENTE</button></Link>
        <Link to="/"><button>INICIO</button></Link>

      </div>
    </div>
  );
}
