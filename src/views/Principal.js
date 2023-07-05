// Principal.js
import React, { useState } from 'react';
import '../styles/Principal.css';
import logo from '../imagenes/portodentB7B7B7-300x129.png'; // Ruta de la imagen del logo

export default function Principal({ onViewChange }) {
  const handleViewChange = (view) => {
    onViewChange(view);
  };

  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul>
          <li>
            <button onClick={() => handleViewChange('pacienteForm')}>PACIENTES</button>
          </li>
          <li>
            <button onClick={() => handleViewChange('buscarPaciente')}>BUSCAR PACIENTE</button>
          </li>
          <li>
            <button onClick={() => handleViewChange('historiaClinicaForm')}>HISTORIAS CLINICAS</button>
          </li>
          <li>
            <button onClick={() => handleViewChange('consultaForm')}>CONSULTAS</button>
          </li>
          <li>
            <button onClick={() => handleViewChange('soporteTecnico')}>SOPORTE TECNICO</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
