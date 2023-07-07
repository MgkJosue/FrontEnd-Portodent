import '../styles/EditarPaciente.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';


export default function EditarPaciente() {

    const { pacienteId } = useParams();
    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


  const [paciente, setPaciente] = useState({
    Cedula: '',
    Nombre: '',
    Apellido: '',
    Sexo: '',
    FechaNacimiento: '',
    Direccion: '',
    Telefono: '',
    Email: ''
  });

  useEffect(() => {
    fetchPaciente();
  }, []);

  const fetchPaciente = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/pacientes/${pacienteId}`);
      setPaciente(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'Nombre':
      case 'Apellido':
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setPaciente({ ...paciente, [name]: value });
        }
        break;
      case 'Cedula':
        if (/^[a-zA-Z0-9]*$/.test(value)  && value.length <= 20) {
            setPaciente({ ...paciente, [name]: value });
        }
        break;
      case 'Telefono':
        if (/^\d*$/.test(value) && value.length <= 20) {
            setPaciente({ ...paciente, [name]: value });
        }
        break;
      default:
        setPaciente({ ...paciente, [name]: value });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/pacientes/${pacienteId}`, paciente);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/buscar-paciente'); // Redireccionar a la vista BuscarPaciente.js
      }, 2000);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al crear el paciente, revise los campos nuevamente.');
    }
  };


  return (
    <div className="page-container">
      <div className={`form-container ${showMessage ? 'show-message' : ''}`}>
        <form onSubmit={handleSubmit} className="paciente-form">
          <h2>Editar Paciente</h2>
          <div className="input-group">
            <label htmlFor="Nombre">Nombres</label>
            <input type="text" name="Nombre" id="Nombre" onChange={handleChange} value={paciente.Nombre} required />
          </div>
          <div className="input-group">
            <label htmlFor="Apellido">Apellidos</label>
            <input type="text" name="Apellido" id="Apellido" onChange={handleChange} value={paciente.Apellido} required />
          </div>
          <div className="input-group">
            <label htmlFor="Cedula">Cédula, Pasaporte, Identificación </label>
            <input type="text" name="Cedula" id="Cedula" onChange={handleChange} value={paciente.Cedula} required />
          </div>
          <label htmlFor="Sexo">Sexo</label>
          <div className="form-control">
            <input type="radio" name="Sexo" id="Masculino" onChange={handleChange} value="Masculino" required />
            <label htmlFor="Masculino">Masculino</label>
            <input type="radio" name="Sexo" id="Femenino" onChange={handleChange} value="Femenino" required />
            <label htmlFor="Femenino">Femenino</label>
          </div>
          <br></br>
          <div className="input-group">
            <label htmlFor="FechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" name="FechaNacimiento" id="FechaNacimiento" onChange={handleChange} value={paciente.FechaNacimiento} required />
          </div>
          <div className="input-group">
            <label htmlFor="Direccion">Direccion</label>
            <input type="text" name="Direccion" id="Direccion" onChange={handleChange} value={paciente.Direccion} required />
          </div>
          <div className="input-group">
            <label htmlFor="Telefono">Telefono</label>
            <input type="tel" name="Telefono" id="Telefono" onChange={handleChange} value={paciente.Telefono} required />
          </div>
          <div className="input-group">
            <label htmlFor="Email">Email</label>
            <input type="email" name="Email" id="Email" onChange={handleChange} value={paciente.Email} required />
          </div>
          <button type="submit">GUARDAR</button>
        </form>
        <Link to="/buscar-paciente"><button>REGRESAR</button></Link>
      </div>
      {showMessage && (
        <div className="message-popup">
          <p><strong>SE ACTUALIZO LOS DATOS DEL PACIENTE CORRECTAMENTE</strong></p>
        </div>
      )}
      {errorMessage && (
        <div className="message-popup">
          <p><strong>{errorMessage}</strong></p>
        </div>
      )}
      
    </div>
  );
}
