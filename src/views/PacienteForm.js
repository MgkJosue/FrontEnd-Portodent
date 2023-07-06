import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PacienteForm.css';
import { useNavigate } from 'react-router-dom';

export default function PacienteForm() {
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

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'Nombre':
      case 'Apellido':
        if (/^[a-zA-Z\s]*$/.test(value)) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'Cedula':
        if (/^[a-zA-Z0-9]*$/.test(value)  && value.length <= 20) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      case 'Telefono':
        if (/^\d*$/.test(value) && value.length <= 20) {
          setFormData({ ...formData, [name]: value });
        }
        break;
      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/pacientes/', formData);
      console.log(response.data);

      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        navigate('/inicio-paciente'); // Redireccionar a la vista BuscarPaciente.js
      }, 2000);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al crear el paciente, revise los campos nuevamente.');
    }
  };


  return (
    <div className="page-container">
      <div className={`form-container ${showMessage ? 'show-message' : ''}`}>
        <div className="botones-container">
          <Link to="/inicio-paciente">
            <button>ATRAS</button>
          </Link>
          <Link to="/">
            <button>INICIO</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="paciente-form">
          <h2>Registrar Paciente</h2>
          <div className="input-group">
            <label htmlFor="Nombre">Nombres</label>
            <input type="text" name="Nombre" id="Nombre" onChange={handleChange} value={formData.Nombre} required />
          </div>
          <div className="input-group">
            <label htmlFor="Apellido">Apellidos</label>
            <input type="text" name="Apellido" id="Apellido" onChange={handleChange} value={formData.Apellido} required />
          </div>
          <div className="input-group">
            <label htmlFor="Cedula">Cédula, Pasaporte, Identificación </label>
            <input type="text" name="Cedula" id="Cedula" onChange={handleChange} value={formData.Cedula} required />
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
            <input type="date" name="FechaNacimiento" id="FechaNacimiento" onChange={handleChange} value={formData.FechaNacimiento} required />
          </div>
          <div className="input-group">
            <label htmlFor="Direccion">Direccion</label>
            <input type="text" name="Direccion" id="Direccion" onChange={handleChange} value={formData.Direccion} required />
          </div>
          <div className="input-group">
            <label htmlFor="Telefono">Telefono</label>
            <input type="tel" name="Telefono" id="Telefono" onChange={handleChange} value={formData.Telefono} required />
          </div>
          <div className="input-group">
            <label htmlFor="Email">Email</label>
            <input type="email" name="Email" id="Email" onChange={handleChange} value={formData.Email} required />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
      {showMessage && (
        <div className="message-popup">
          <p><strong>SE GUARDÓ CORRECTAMENTE EL PACIENTE</strong></p>
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
