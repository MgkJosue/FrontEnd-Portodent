import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BuscarPaciente.css';
import { Link } from 'react-router-dom';

export default function BuscarPaciente({ onViewChange }) {
  //adaptada para borrar paciente de ser necesario
  const handleViewChange = (view, pacienteId) => {
    if (view === 'ELIMINAR') {
      setPacienteIdToDelete(pacienteId);
    } else {
      onViewChange(view, pacienteId);
    }
  };

  const [formData, setFormData] = useState({
    search: '',
    patientsPerPage: 5,
  });

  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //borrar paciente
  const [pacienteIdToDelete, setPacienteIdToDelete] = useState(null);


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
    //borrar
    setPacienteIdToDelete(null); // Restablecer el ID del paciente a eliminar al cambiar la búsqueda
  };

  const handlePatientsPerPageChange = (e) => {
    setFormData({ ...formData, patientsPerPage: parseInt(e.target.value) });
    setCurrentPage(1);
  };

  //borrar
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/pacientes/${pacienteIdToDelete}`);
      // Actualizar la lista de pacientes después de eliminar
      fetchPacientes();
      setPacienteIdToDelete(null); // Restablecer el ID del paciente a eliminar
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastPatient = currentPage * formData.patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - formData.patientsPerPage;
  const currentPatients = filteredPacientes.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='container'>
      <div className="botones-container">
          <Link to="/inicio-paciente"><button>ATRAS</button></Link>
          <Link to="/"><button>INICIO</button></Link>
        </div>
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
            <th>Acciones</th>
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
              <Link to={`/historia-clinica-form/${paciente.ID_Paciente}`}><button>VER HISTORIA CLINICA</button></Link>
              <Link to={`/editar-paciente/${paciente.ID_Paciente}`}><button>EDITAR</button></Link>
              <button onClick={() => handleViewChange('ELIMINAR', paciente.ID_Paciente)}>ELIMINAR</button>
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


      {pacienteIdToDelete && (
        <div className="confirmation-dialog">
          <p>¿Estás seguro de que quieres eliminar este paciente?</p>
          <div className="confirmation-buttons">
            <button className="yes-button" onClick={handleDelete}>Sí</button>
            <button className="no-button" onClick={() => setPacienteIdToDelete(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
