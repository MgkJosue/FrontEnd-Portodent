import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BuscarPaciente.css';
import { Link } from 'react-router-dom';

export default function BuscarPaciente({ onViewChange }) {
  const handleViewChange = (view, pacienteId) => {
    onViewChange(view, pacienteId);
  };

  const [formData, setFormData] = useState({
    search: '',
    patientsPerPage: 5,
  });

  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPacientes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pacientes/');
      setPacientes(response.data);
      setFilteredPacientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const searchValue = e.target.value.toLowerCase();
    const filtered = pacientes.filter((paciente) => {
      const fullName = `${paciente.Nombre} ${paciente.Apellido}`.toLowerCase();
      return fullName.includes(searchValue) || paciente.Cedula.includes(searchValue);
    });
    setFilteredPacientes(filtered);
    setCurrentPage(1);
  };

  const handlePatientsPerPageChange = (e) => {
    setFormData({ ...formData, patientsPerPage: parseInt(e.target.value) });
    setCurrentPage(1);
  };

  const indexOfLastPatient = currentPage * formData.patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - formData.patientsPerPage;
  const currentPatients = filteredPacientes.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()} className="buscarPaciente-form">
        <h2>Buscar Paciente</h2>
        <div className="input-group">
          <label htmlFor="search">Buscar por cédula, nombre o apellido</label>
          <input type="text" name="search" id="search" onChange={handleChange} value={formData.search} />
        </div>
        <div className="input-group">
          <label htmlFor="patientsPerPage">Pacientes por página:</label>
          <select
            name="patientsPerPage"
            id="patientsPerPage"
            onChange={handlePatientsPerPageChange}
            value={formData.patientsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
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
          {currentPatients.map((paciente) => (
            <tr key={paciente.ID_Paciente}>
              <td>{paciente.Nombre}</td>
              <td>{paciente.Apellido}</td>
              <td>{paciente.Cedula}</td>
              <td>{paciente.Telefono}</td>
              <td>
                <button onClick={() => handleViewChange('historiaClinica', paciente.ID_Paciente)}>
                  Ver Historia Clínica
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Anterior</button>
        )}
        {filteredPacientes.length > formData.patientsPerPage && (
          <button onClick={() => paginate(currentPage + 1)}>Siguiente</button>
        )}
      </div>
       <Link to="/"><button>REGRESAR</button></Link>
    </div>
  );
}
