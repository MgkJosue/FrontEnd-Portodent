// HistoriaClinicaForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/HistoriaClinica.css';
import { Link } from 'react-router-dom';


export default function HistoriaClinicaForm() {


  const [formData, setFormData] = useState({
    ID_Paciente: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/historias_clinicas/', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><form onSubmit={handleSubmit} className="historia-form">
      <h2>Crear Historia Clínica</h2>
      <div className="input-group">
        <label htmlFor="ID_Paciente">ID del Paciente</label>
        <input type="text" name="ID_Paciente" id="ID_Paciente" onChange={handleChange} value={formData.ID_Paciente} />
      </div>
      <button type="submit">Enviar</button>

    </form>
    <Link to="/"><button>INICIO</button></Link>
    </>
  );
}
