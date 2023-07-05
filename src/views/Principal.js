import React from 'react';
import '../styles/Principal.css';
import logo from '../imagenes/portodentB7B7B7-300x129.png'; // Ruta de la imagen del logo
import { Link } from 'react-router-dom';

export default function Principal() {
  return (
    <div className="wrapper">
      
      <div className="sidebar">
        <ul>
        <Link to="/paciente-form">
          <li>
            PACIENTES
          </li>
          </Link>
          <Link to="/buscar-paciente">
          <li>
            BUSCAR PACIENTE
          </li></Link>
          <Link to="/historia-clinica-form">
          <li>
            HISTORIAS CLINICAS
          </li>
          </Link>
          <Link to="/consulta-form">
          <li>
            CONSULTAS
          </li>
          </Link>
          <Link to="/soporte-tecnico">
          <li>
           SOPORTE TECNICO
          </li>
          </Link>
        </ul>
      </div>

      <div className="topbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
      </div>
      <br/>
    </div>
  );
}
