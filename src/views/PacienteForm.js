// PacienteForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PacienteForm.css';


export default function PacienteForm({ onViewChange }) {

  //
  const handleViewChange = (view) => {
    onViewChange(view);
  };


  const [formData, setFormData] = useState({
    Cedula: '',
    Nombre: '',
    Apellido: '',
    Sexo: '',
    FechaNacimiento: '',
    Direccion: '',
    Telefono: '',
    Email: ''
  });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/pacientes/', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><form onSubmit={handleSubmit} className="paciente-form">
      <h2>Registrar Paciente</h2>
      {Object.keys(formData).map((key) => (
        <div className="input-group" key={key}>
          <label htmlFor={key}>{key}</label>
          <input type="text" name={key} id={key} onChange={handleChange} value={formData[key]} />
        </div>
      ))}
      <button type="submit">Enviar</button>

    </form><button onClick={() => handleViewChange('principal')}>REGRESAR</button></>
  );

  
}




