import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BuscarPaciente.css';

export default function BuscarPaciente({ onViewChange }) {

  const handleViewChange = (view) => {
    onViewChange(view);
  };

  const [formData, setFormData] = useState({
    search: '',
  });

  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/pacientes`);
        setPacientes(response.data);
        setFilteredPacientes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = pacientes.filter((paciente) => {
      return (paciente.cedula && paciente.cedula.includes(formData.search)) || 
             (paciente.nombre && paciente.nombre.includes(formData.search));
    });
    setFilteredPacientes(filtered);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="buscarPaciente-form">
      <h2>Buscar Paciente</h2>
      <div className="input-group">
        <label htmlFor="search">Buscar por cédula o nombre</label>
        <input type="text" name="search" id="search" onChange={handleChange} value={formData.search} />
      </div>
      <button type="submit">Buscar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cédula</th>
          <th>Número de Teléfono</th>
        </tr>
      </thead>
      <tbody>
      {filteredPacientes.map(paciente => (
        <tr key={paciente.ID_Paciente}>
          <td>{paciente.nombre}</td>
          <td>{paciente.apellido}</td>
          <td>{paciente.cedula}</td>
          <td>{paciente.telefono}</td>
          <td><button onClick={() => handleViewChange(paciente)}>Ver Historia Clínica</button></td>
        </tr>
      ))}
      </tbody>
    </table>
    
    <button onClick={() => handleViewChange('principal')}>REGRESAR</button>
    </>
  );
}
