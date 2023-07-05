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
      <div className="input-group">
        <label htmlFor="Nombre">Nombres</label>
        <input type="text" name="Nombre" id="Nombre" onChange={handleChange} value={formData.Nombre} />
      </div>
      <div className="input-group">
        <label htmlFor="Apellido">Apellidos</label>
        <input type="text" name="Apellido" id="Apellido" onChange={handleChange} value={formData.Apellido} />
      </div>
      <div className="input-group">
        <label htmlFor="Cedula">Cedula</label>
        <input type="text" name="Cedula" id="Cedula" onChange={handleChange} value={formData.Cedula} />
      </div>

      
      <label htmlFor="Sexo">Sexo</label>
      <div className="form-control ">
      <input type="radio" name="Sexo" id="Masculino" onChange={handleChange} value="Masculino" />
      <label htmlFor="Masculino">Masculino</label>
      <input type="radio" name="Sexo" id="Femenino" onChange={handleChange} value="Femenino" />
      <label htmlFor="Femenino">Femenino</label>
      </div>
      <br></br>



      <div className="input-group">
        <label htmlFor="FechaNacimiento">Fecha de Nacimiento</label>
        <input type="date" name="FechaNacimiento" id="FechaNacimiento" onChange={handleChange} value={formData.FechaNacimiento} />
      </div>
      <div className="input-group">
        <label htmlFor="Direccion">Direccion</label>
        <input type="text" name="Direccion" id="Direccion" onChange={handleChange} value={formData.Direccion} />
      </div>
      <div className="input-group">
        <label htmlFor="Telefono">Telefono</label>
        <input type="text" name="Telefono" id="Telefono" onChange={handleChange} value={formData.Telefono} />
      </div>
      <div className="input-group">
        <label htmlFor="Email">Email</label>
        <input type="text" name="Email" id="Email" onChange={handleChange} value={formData.Email} />
      </div>
      <button type="submit">Enviar</button>

    </form><button onClick={() => handleViewChange('principal')}>REGRESAR</button></>
  );

  
}




