import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Principal.css'; // Asegúrate de tener el archivo de estilos Principal.css correspondiente

export default function Principal({ onViewChange }) {
    const handleViewChange = (view) => {
      onViewChange(view);
    };
  
    return (
      <div className="principal">
        <h2>Principal</h2>
        <div className="button-group">
          <button onClick={() => handleViewChange('pacienteForm')}>Ver Paciente Form</button>
          <button onClick={() => handleViewChange('historiaClinicaForm')}>Ver Historia Clínica Form</button>
          <button onClick={() => handleViewChange('consultaForm')}>Ver Consulta Form</button>
        </div>
      </div>
    );
  }
  