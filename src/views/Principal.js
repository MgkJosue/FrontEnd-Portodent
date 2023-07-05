import React, { useState } from 'react';
import axios from 'axios';
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
            <button onClick={() => handleViewChange('historiaClinicaForm')}>HISTORIAS CLINICAS</button>
          </li>
          <li>
            <button onClick={() => handleViewChange('consultaForm')}>CONSULTAS</button>
          </li>
        </ul>
      </div>
      
    </div>
  );
}
