import React from 'react';
import '../styles/Principal.css';
import logo from '../images/portodentB7B7B7-300x129.png'; // Ruta de la imagen del logo
import { Link } from 'react-router-dom';
import back from '../images/foroPortodent.jpeg';

export default function Principal() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <Link to="/paciente-form" className="link-button"><button>REGISTRO PACIENTE</button></Link>
        <Link to="/buscar-paciente" className="link-button"><button>BUSCAR PACIENTE</button></Link>
        <Link to="/soporte-tecnico" className="link-button">
          <button>SOPORTE TECNICO</button>
        </Link>
      </div>

      <div className="topbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <img src={back} alt="Imagen" className="topbar-image" />
      </div>
      <br/>
    </div>
    
  );
}
